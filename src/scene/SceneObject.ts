import EventSubscriber from "../core/EventSubscriber";

interface ISceneObject {}

class SceneObject implements ISceneObject {
  private _isVisible: boolean = true;
  private _properties: any = {};

  readonly onVisibilityChanged = new EventSubscriber<boolean>();
  readonly onPropertiesChanged = new EventSubscriber<any>();

  protected initializeProperties(properties: any) {
    this._properties = properties;
  }

  setProperties(properties: any) {
    this._properties = properties;
    this.onPropertiesChanged.dispatch(this._properties);
  }

  getProperties(): any {
    return this._properties;
  }

  setVisibility(visibility: boolean) {
    var currentVisibility = this._isVisible;
    this._isVisible = visibility;
    if (currentVisibility != visibility) {
      this.onVisibilityChanged.dispatch(this._isVisible);
    }
  }

  getVisibility(): boolean {
    return this._isVisible;
  }
}

export default SceneObject;
