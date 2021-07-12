import SceneObject from "../SceneObject";
import { property } from "../../core/PropertyDecorator";
import Segment from "./Segment";
import Vector3 from "../../maths/Vector3";
import Point from "./Point";

class PointOnLine extends Point {
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
    return Vector3.FindNearestPointOnLine(
      this.segment.point1.position,
      Vector3.Substract(this.segment.point2.position, this.segment.point1.position),
      this.point.position
    );
  }

  initialize() {
    this.name = "New Point on Line";
  }
}

export default PointOnLine;
