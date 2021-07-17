import SceneObject from "../SceneObject";

export abstract class Point extends SceneObject {
  abstract getPosition();

  private static readonly namesString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private static namesStringIndex = 0;

  protected static getDefaultName(): string {
    return this.namesString.charAt(this.namesStringIndex++);
  }
}
