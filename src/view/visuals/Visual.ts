import SceneObject from "../../scene/SceneObject";
import * as Three from "three";

export abstract class Visual<T extends SceneObject> extends Three.Group {
  protected _object: T;
  protected _camera: Three.Camera;
  protected _element: HTMLElement;

  constructor(object: T, camera: Three.Camera, element: HTMLElement) {
    super();
    this._object = object;
    this._camera = camera;
    this._element = element;

    this._object.onPropertyChanged.subscribe(this, this.onPropertyChanged);
    this._object.onDestroy.subscribe(this, this.onDestroy);
    this._object.onSelected.subscribe(this, this.onSelected);
    this._object.onHighlighted.subscribe(this, this.onHighlighted);
  }

  getObject(): T {
    return this._object;
  }

  abstract onPropertyChanged(name: string);

  abstract onRender();

  abstract onDestroy();

  abstract onCreate();

  abstract onSelected(selected: boolean);

  abstract onHighlighted(highlighted: boolean);
}
