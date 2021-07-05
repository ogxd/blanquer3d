import SceneObject from "../SceneObject";
import Vector3 from "../../maths/Vector3";
import { property } from "../../core/PropertyDecorator";

class Point extends SceneObject {
  @property
  name: string;

  @property
  position: Vector3;

  initialize() {
    this.position = new Vector3(0, 0, 0);
    this.name = "New Point";
  }
}

export default Point;
