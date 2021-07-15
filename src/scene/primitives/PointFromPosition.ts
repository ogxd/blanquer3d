import Vector3 from "../../maths/Vector3";
import { property } from "../../core/PropertyDecorator";
import { Point } from "./Point";
import { ISerializable } from "src/core/Serialization";
import * as Blanquer3d from "src/blanquer3d";

export class PointFromPosition extends Point implements ISerializable {
  serialize(object: any) {
    object["type"] = "PointFromPosition";
    this.position?.serialize((object["position"] = new Object()));
    super.serialize(object);
  }

  deserialize(object: any) {
    this.position = new Vector3(object["position"]["x"], object["position"]["y"], object["position"]["z"]);
    super.deserialize(object);
  }

  @property
  name: string;

  @property
  position: Vector3;

  initialize() {
    this.position = new Vector3(0, 0, 0);
    this.name = Point.getDefaultName();
  }

  getPosition() {
    return this.position;
  }
}
