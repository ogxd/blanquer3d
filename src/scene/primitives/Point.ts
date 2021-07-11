import * as Blanquer3d from "blanquer3d";

export class Point extends Blanquer3d.SceneObject {
  @Blanquer3d.property
  name: string;

  @Blanquer3d.property
  position: Blanquer3d.Vector3;

  initialize() {
    this.position = new Blanquer3d.Vector3(0, 0, 0);
    this.name = "New Point";
  }
}
