import Vector3 from "../../maths/Vector3";
import { property } from "../../core/PropertyDecorator";
import { Segment } from "./Segment";
import { Point } from "./Point";
import { reflectable } from "src/core/Reflection";

@reflectable("PointOnLine")
export class PointOnLine extends Point {
  @property
  point: Point;

  @property
  segment: Segment;

  initialize() {
    this.name = Point.getDefaultName();
  }

  getPosition() {
    if (!this.point || !this.segment) {
      return Vector3.ZERO;
    }
    const pos1 = this.segment.point1.getPosition();
    const pos2 = this.segment.point2.getPosition();
    const dir = Vector3.Substract(pos2, pos1);
    return Vector3.FindNearestPointOnLine(pos1, dir, this.point.getPosition());
  }

  serialize(object: any) {
    object["type"] = "PointOnLine";
    object["refs"] = {
      point: this.point?.name,
      segment: this.segment?.name,
    };
    super.serialize(object);
  }

  deserialize(object: any) {
    super.deserialize(object);
  }
}
