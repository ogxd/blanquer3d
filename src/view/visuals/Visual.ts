import * as Blanquer3d from "blanquer3d";
import * as Three from "three";

export class VisualBase extends Three.Group {
  onDestroy() {}
  onCreate() {}
  onSelected() {}
  onDeselected() {}
}

export class Visual<T extends Blanquer3d.SceneObject> extends VisualBase {
  protected _object: T;
  protected _scene: Three.Scene;

  constructor(object: T) {
    super();
    this._object = object;

    this._object.onPropertyChanged.subscribe(this, this.onPropertyChanged);
    this._object.onVisibilityChanged.subscribe(this, this.onVisibilityChanged);
    this._object.onDestroy.subscribe(this, this.onDestroy);
  }

  onPropertyChanged(name: string) {}

  onVisibilityChanged(isVisible: boolean) {}

  onRender() {}
}
