import SceneObject from "../SceneObject";
import { Point } from "./Point";
import { property } from "../../core/PropertyDecorator";

export class Segment extends SceneObject {
  @property
  name: string;

  @property
  point1: Point;

  @property
  point2: Point;

  initialize() {
    this.name = "New Segment";
  }
}
