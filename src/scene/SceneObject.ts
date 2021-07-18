import EventSubscriber from "src/core/EventSubscriber";
import { property } from "src/core/PropertyDecorator";
import { ISerializable } from "src/core/Serialization";

abstract class SceneObject implements ISerializable {
  serialize(object: any) {
    object["visibility"] = this.visibility;
    object["name"] = this.name;
  }

  deserialize(object: any) {
    this.visibility = object["visibility"];
    this.name = object["name"];
  }

  @property
  visibility: boolean = true;

  @property
  name: string;

  readonly onPropertyChanged = new EventSubscriber<string>();
  readonly onSelected = new EventSubscriber<boolean>();
  readonly onDestroy = new EventSubscriber<void>();

  abstract initialize();
}

export default SceneObject;
