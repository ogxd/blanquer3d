import SceneObject from "../../scene/SceneObject";
import * as Three from "three";
import { property } from "src/core/PropertyDecorator";

abstract class Visual<T extends SceneObject> {
  protected _object: T;
  protected _scene: Three.Scene;

  constructor(object: T, scene: Three.Scene) {
    this._object = object;
    this._scene = scene;

    this._object.onPropertyChanged.subscribe(this, this.onPropertyChanged);
    this._object.onVisibilityChanged.subscribe(this, this.onVisibilityChanged);
    this._object.onDestroy.subscribe(this, this.onDestroy);
  }

  abstract onPropertyChanged(name: string);

  abstract onVisibilityChanged(isVisible: boolean);

  abstract onCreate();

  abstract onDestroy();

  abstract onRender();
}

export default Visual;
