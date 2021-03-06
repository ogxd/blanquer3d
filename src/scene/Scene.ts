import { createInstance } from "src/core/Reflection";
import EventSubscriber from "../core/EventSubscriber";
import { arrayRemove } from "../core/Utils";
import SceneObject from "../scene/SceneObject";

class Scene {
  save(): string {
    const objects = [];
    this._objects.forEach((element) => {
      const child = new Object();
      objects.push(child);
      element.serialize(child);
    });
    const json = JSON.stringify(objects);
    return window.btoa(json).replaceAll("+", "-").replaceAll("/", "_").replaceAll("=", "");
  }

  load(base64: string) {
    const json: string = window.atob(base64.replaceAll("-", "+").replaceAll("_", "/"));
    const objects = JSON.parse(json);
    this._objects.length = 0;
    const bindings: Function[] = [];
    objects.forEach((element) => {
      const child = createInstance(element["type"]);
      child.deserialize(element);
      this.addObjectNoInit(child);
      bindings.push(() => {
        const refs = element["refs"];
        for (const ref in refs) {
          child[ref] = this._objects.find((x) => x.name == refs[ref]);
        }
      });
    });
    bindings.forEach((x) => x());
  }

  private readonly _objects: SceneObject[] = [];
  readonly onObjectAdded = new EventSubscriber<SceneObject>();
  readonly onObjectRemoved = new EventSubscriber<SceneObject>();
  readonly onObjectSelected = new EventSubscriber<SceneObject>();
  readonly onObjectHighlighted = new EventSubscriber<SceneObject>();

  private _selected: SceneObject;
  private _highlighted: SceneObject;

  getSelected() {
    return this._selected;
  }

  setSelected(selected: SceneObject) {
    if (this._selected !== selected) {
      this._selected?.onSelected.dispatch(false);
      this._selected = selected;
      this._selected?.onSelected.dispatch(true);
      this.onObjectSelected.dispatch(selected);
    }
  }

  setHighlighted(highlighted: SceneObject) {
    if (this._highlighted !== highlighted) {
      this._highlighted?.onHighlighted.dispatch(false);
      this._highlighted = highlighted;
      this._highlighted?.onHighlighted.dispatch(true);
      this.onObjectHighlighted.dispatch(highlighted);
    }
  }

  addObject(object: SceneObject) {
    object.initialize();
    this.addObjectNoInit(object);
  }

  private addObjectNoInit(object: SceneObject) {
    this._objects.push(object);
    console.log("object added");
    this.onObjectAdded.dispatch(object);
  }

  removeObject(object: SceneObject) {
    arrayRemove(this._objects, object);
    this.onObjectRemoved.dispatch(object);
    object.onDestroy.dispatch();
  }

  forEach(func: (value: SceneObject, index: number, array: SceneObject[]) => void) {
    this._objects.forEach(func);
  }

  static _instance: Scene = null;
  static getInstance(): Scene {
    if (this._instance === null) {
      this._instance = new Scene();
    }
    return this._instance;
  }
}

export default Scene;
