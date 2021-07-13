import Vector3 from "../../maths/Vector3";
import { property } from "../../core/PropertyDecorator";
import { Point } from "./Point";

export class PointFromPosition extends Point {
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
