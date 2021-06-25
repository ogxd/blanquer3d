import SceneObject from "../SceneObject";
import Vector3 from "../../maths/Vector3";

class Point extends SceneObject {
  constructor() {
    super();
    this.initializeProperties({ position: new Vector3(0, 0, 0) });
  }
}

export default Point;
