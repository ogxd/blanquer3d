import { Serializable, JsonProperty } from "typescript-json-serializer";
import EventSubscriber from "src/core/EventSubscriber";
import { property } from "src/core/PropertyDecorator";
import { ISerializable } from "src/core/Serialization";

@Serializable()
abstract class SceneObject implements ISerializable {
  serialize(object: any) {
    object["visibility"] = this.visibility;
    object["name"] = this.visibility;
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
