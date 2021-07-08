import * as Blanquer3d from "src/blanquer3d";

export class Segment extends Blanquer3d.SceneObject {
  @Blanquer3d.property
  name: string;

  @Blanquer3d.property
  point1: Blanquer3d.Point;

  @Blanquer3d.property
  point2: Blanquer3d.Point;

  initialize() {
    this.name = "New Segment";
  }
}
