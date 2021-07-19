import Vector3 from "../../maths/Vector3";
import { property } from "../../core/PropertyDecorator";
import { Point } from "./Point";
import { ISerializable } from "src/core/Serialization";
import { reflectable } from "src/core/Reflection";

@reflectable(1)
export class PointFromPosition extends Point implements ISerializable {
  @property
  position: Vector3;

  initialize() {
    this.position = new Vector3(0, 0, 0);
    this.name = Point.getDefaultName();
  }

  getPosition() {
    return this.position;
  }

  serialize(object: any) {
    object["type"] = this["classId"];
    this.position?.serialize((object["position"] = new Object()));
    super.serialize(object);
  }

  deserialize(object: any) {
    const position = object["position"];
    if (position) {
      this.position = new Vector3(position.x, position.y, position.z);
    }
    super.deserialize(object);
  }
}
