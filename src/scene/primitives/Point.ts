import SceneObject from "../SceneObject";
import Vector3 from "../../maths/Vector3";
import { property } from "../../core/PropertyDecorator";

class Point extends SceneObject {
  @property()
  position: Vector3 = new Vector3(0, 0, 0);
}

export default Point;
