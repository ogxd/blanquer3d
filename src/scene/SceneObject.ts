import * as Blanquer3d from "src/blanquer3d";

export abstract class SceneObject {
  private _isVisible: boolean = true;

  readonly onVisibilityChanged = new Blanquer3d.EventSubscriber<boolean>();
  readonly onPropertyChanged = new Blanquer3d.EventSubscriber<string>();
  readonly onDestroy = new Blanquer3d.EventSubscriber<void>();

  setVisibility(visibility: boolean) {
    var currentVisibility = this._isVisible;
    this._isVisible = visibility;
    if (currentVisibility !== visibility) {
      this.onVisibilityChanged.dispatch(this._isVisible);
    }
  }

  getVisibility(): boolean {
    return this._isVisible;
  }

  abstract initialize();
}
