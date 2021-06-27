import EventSubscriber from "../core/EventSubscriber";
import { arrayRemove } from "../core/Utils";
import SceneObject from "../scene/SceneObject";

interface IScene {}

class Scene implements IScene {
  private readonly _objects: SceneObject[] = [];
  readonly onObjectAdded = new EventSubscriber<SceneObject>();
  readonly onObjectRemoved = new EventSubscriber<SceneObject>();

  addObject(object: SceneObject) {
    this._objects.push(object);
    this.onObjectAdded.dispatch(object);
  }

  removeObject(object: SceneObject) {
    arrayRemove(this._objects, object);
    this.onObjectRemoved.dispatch(object);
    object.onDestroy.dispatch();
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
