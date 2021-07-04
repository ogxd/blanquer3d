import Point from "../../scene/primitives/Point";
import Visual from "./Visual";
import * as Three from "three";

class PointVisual extends Visual<Point> {
  private _sphere: Three.Mesh;

  onCreate() {
    const geometry = new Three.SphereGeometry(0.5, 32, 32);
    const material = new Three.MeshBasicMaterial({ color: 0xff0000 });
    this._sphere = new Three.Mesh(geometry, material);
    this._scene.add(this._sphere);
  }

  onDestroy() {
    this._scene.remove(this._sphere);
  }

  onRender() {
    //console.log(this._object);
  }

  onVisibilityChanged(isVisible: boolean) {
    this._sphere.visible = isVisible;
  }

  onPropertyChanged(name: string) {
    if (name === "position") {
      var pos = this._object.position;
      this._sphere.position.set(pos.x, pos.y, pos.z);
    }
  }
}

export default PointVisual;
