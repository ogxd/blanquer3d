import SceneObject from "../SceneObject";
import Point from "./Point";
import { property } from "../../core/PropertyDecorator";

class Segment extends SceneObject {
  @property()
  point1: Point;

  @property()
  point2: Point;

  initialize() {}
}

export default Segment;
