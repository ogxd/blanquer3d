import Segment from "../../scene/primitives/Segment";
import Visual from "src/view/visuals/Visual";
import * as Three from "three";
import { MeshLine, MeshLineMaterial } from "three.meshline";

class SegmentVisual extends Visual<Segment> {
  private _line: MeshLine;
  private _mesh: Three.Mesh;
  private _material: MeshLineMaterial;

  onCreate() {
    this._line = new MeshLine();
    this._material = new MeshLineMaterial();
    this._material.color = new Three.Color(0, 0, 0);
    this._material.sizeAttenuation = 0;
    this._material.lineWidth = 0.002;
    this._mesh = new Three.Mesh(this._line, this._material);

    this._scene.add(this._mesh);
  }

  onDestroy() {
    this._scene.remove(this._mesh);
  }

  onRender() {
    //console.log(this._object);
  }

  onVisibilityChanged(isVisible: boolean) {
    this._mesh.visible = isVisible;
  }

  onPropertyChanged(name: string) {
    if (name === "point1" || name === "point2") {
      var pos1 = this._object.point1?.position;
      var pos2 = this._object.point2?.position;

      if (pos1 && pos2) {
        const points = [];
        points.push(pos1.x, pos1.y, pos1.z);
        points.push(pos2.x, pos2.y, pos2.z);

        this._line.setPoints(points);
      }
    }
  }
}

export default SegmentVisual;
