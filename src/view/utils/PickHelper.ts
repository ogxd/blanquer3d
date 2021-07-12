import SceneObject from "src/scene/SceneObject";
import * as Three from "three";
import { Visual } from "../visuals/Visual";

class PickHelper {
  constructor() {
    this.raycaster = new Three.Raycaster();
  }

  raycaster: Three.Raycaster;
  pickedObjectSavedColor: any;

  pick(x: number, y: number, scene, camera): Visual<SceneObject> {
    // cast a ray through the frustum
    this.raycaster.setFromCamera({ x, y }, camera);
    // get the list of objects the ray intersected
    const intersectedObjects = this.raycaster.intersectObjects(scene.children, true);
    if (intersectedObjects.length) {
      // pick the first object. It's the closest one
      const pickedObject = intersectedObjects[0].object;

      let parent: Three.Object3D = pickedObject;
      while (parent && !(parent instanceof Visual)) {
        parent = parent.parent;
      }

      return parent as Visual<SceneObject>;
    }
  }
}

export default PickHelper;
