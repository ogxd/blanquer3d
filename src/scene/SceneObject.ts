import EventSubscriber from "src/core/EventSubscriber";
import { property } from "src/core/PropertyDecorator";
import { ISerializable } from "src/core/Serialization";

abstract class SceneObject implements ISerializable {
  @property
  visibility: boolean = true;

  @property
  name: string;

  readonly onPropertyChanged = new EventSubscriber<string>();
  readonly onSelected = new EventSubscriber<boolean>();
  readonly onHighlighted = new EventSubscriber<boolean>();
  readonly onDestroy = new EventSubscriber<void>();

  abstract initialize();

  serialize(object: any) {
    object["visibility"] = this.visibility;
    object["name"] = this.name;
  }

  deserialize(object: any) {
    this.visibility = object["visibility"];
    this.name = object["name"];
  }
}

export default SceneObject;
