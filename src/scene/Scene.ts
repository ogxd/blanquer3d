import * as Blanquer3d from "blanquer3d";

export class Scene {
  private readonly _objects: Blanquer3d.SceneObject[] = [];
  readonly onObjectAdded = new Blanquer3d.EventSubscriber<Blanquer3d.SceneObject>();
  readonly onObjectRemoved = new Blanquer3d.EventSubscriber<Blanquer3d.SceneObject>();
  readonly onObjectSelected = new Blanquer3d.EventSubscriber<Blanquer3d.SceneObject>();

  private _selected: Blanquer3d.SceneObject;

  getSelected() {
    return this._selected;
  }

  setSelected(selected: Blanquer3d.SceneObject) {
    if (this._selected !== selected) {
      this._selected = selected;
      this.onObjectSelected.dispatch(selected);
    }
  }

  addObject(object: Blanquer3d.SceneObject) {
    object.initialize();
    this._objects.push(object);
    this.onObjectAdded.dispatch(object);
  }

  removeObject(object: Blanquer3d.SceneObject) {
    Blanquer3d.arrayRemove(this._objects, object);
    this.onObjectRemoved.dispatch(object);
    object.onDestroy.dispatch();
  }

  forEach(func: (value: Blanquer3d.SceneObject, index: number, array: Blanquer3d.SceneObject[]) => void) {
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
