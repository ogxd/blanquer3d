import * as Three from "three";
import { MeshLine, MeshLineMaterial } from "three.meshline";

export class Grid extends Three.Group {
  constructor() {
    super();

    const lineX = new MeshLine();
    lineX.setPoints([0, 0, 0, 100, 0, 0]);
    const materialX = new MeshLineMaterial();
    materialX.color = new Three.Color(1, 0, 0);
    materialX.sizeAttenuation = 0;
    materialX.lineWidth = 0.002;
    const meshX = new Three.Mesh(lineX, materialX);
    this.add(meshX);

    const lineY = new MeshLine();
    lineY.setPoints([0, 0, 0, 0, 100, 0]);
    const materialY = new MeshLineMaterial();
    materialY.color = new Three.Color(0, 1, 0);
    materialY.sizeAttenuation = 0;
    materialY.lineWidth = 0.002;
    const meshY = new Three.Mesh(lineY, materialY);
    this.add(meshY);

    const lineZ = new MeshLine();
    lineZ.setPoints([0, 0, 0, 0, 0, 100]);
    const materialZ = new MeshLineMaterial();
    materialZ.color = new Three.Color(0, 0, 1);
    materialZ.sizeAttenuation = 0;
    materialZ.lineWidth = 0.002;
    const meshZ = new Three.Mesh(lineZ, materialZ);
    this.add(meshZ);
  }
}
