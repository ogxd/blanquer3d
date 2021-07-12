import SceneObject from "../../scene/SceneObject";
import * as Three from "three";

export abstract class Visual<T extends SceneObject> extends Three.Group {
  protected _object: T;
  protected _scene: Three.Scene;

  constructor(object: T) {
    super();
    this._object = object;

    this._object.onPropertyChanged.subscribe(this, this.onPropertyChanged);
    this._object.onVisibilityChanged.subscribe(this, this.onVisibilityChanged);
    this._object.onDestroy.subscribe(this, this.onDestroy);
    this._object.onSelected.subscribe(this, this.onSelected);
  }

  getObject(): T {
    return this._object;
  }

  abstract onPropertyChanged(name: string);

  abstract onVisibilityChanged(isVisible: boolean);

  abstract onRender();

  abstract onDestroy();

  abstract onCreate();

  abstract onSelected(selected: boolean);
}
