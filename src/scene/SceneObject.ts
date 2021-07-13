import EventSubscriber from "src/core/EventSubscriber";
import { property } from "src/core/PropertyDecorator";

abstract class SceneObject {
  private _isVisible: boolean = true;

  readonly onVisibilityChanged = new EventSubscriber<boolean>();
  readonly onPropertyChanged = new EventSubscriber<string>();
  readonly onSelected = new EventSubscriber<boolean>();
  readonly onDestroy = new EventSubscriber<void>();

  @property
  name: string;

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

export default SceneObject;
