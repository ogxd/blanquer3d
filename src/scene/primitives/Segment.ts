import SceneObject from "../SceneObject";
import { Point } from "./Point";
import { property } from "../../core/PropertyDecorator";

export class Segment extends SceneObject {
  serialize(object: any) {
    object["type"] = "Segment";
    object["refs"] = {
      point: this.point1?.name,
      segment: this.point2?.name,
    };
    super.serialize(object);
  }

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
