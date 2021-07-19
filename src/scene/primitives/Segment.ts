import SceneObject from "../SceneObject";
import { Point } from "./Point";
import { property } from "../../core/PropertyDecorator";
import { reflectable } from "src/core/Reflection";

@reflectable(3)
export class Segment extends SceneObject {
  @property
  point1: Point;

  @property
  point2: Point;

  initialize() {
    this.name = "New Segment";
  }

  serialize(object: any) {
    object["type"] = this["classId"];
    object["refs"] = {
      point1: this.point1?.name,
      point2: this.point2?.name,
    };
    super.serialize(object);
  }
}
