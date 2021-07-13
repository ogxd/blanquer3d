import Vector3 from "../../maths/Vector3";
import { property } from "../../core/PropertyDecorator";
import { Segment } from "./Segment";
import { Point } from "./Point";

export class PointOnLine extends Point {
  @property
  name: string;

  @property
  point: Point;

  @property
  segment: Segment;

  getPosition() {
    if (!this.point || !this.segment) {
      return Vector3.ZERO;
    }
    const pos1 = this.segment.point1.getPosition();
    const pos2 = this.segment.point2.getPosition();
    const dir = Vector3.Substract(pos2, pos1);
    return Vector3.FindNearestPointOnLine(pos1, dir, this.point.getPosition());
  }

  initialize() {
    this.name = Point.getDefaultName();
  }
}
