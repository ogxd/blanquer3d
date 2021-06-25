import EventSubscriber from "../core/EventSubscriber";
import { arrayRemove } from "../core/Utils";
import SceneObject from "../scene/SceneObject";

interface IScene {}

class Scene implements IScene {
  private readonly _objects: SceneObject[] = [];
  readonly onObjectAdded = new EventSubscriber<string>();
  readonly onObjectRemoved = new EventSubscriber<string>();

  addObject(object: SceneObject) {
    this._objects.push(object);
  }

  removeObject(object: SceneObject) {
    arrayRemove(this._objects, object);
  }
}

export default Scene;
