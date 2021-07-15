import { Serializable, JsonProperty } from "typescript-json-serializer";
import SceneObject from "../SceneObject";

@Serializable()
export abstract class Point extends SceneObject {
  abstract getPosition();

  private static readonly namesString = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  private static namesStringIndex = 0;

  protected static getDefaultName(): string {
    return this.namesString.charAt(this.namesStringIndex++);
  }
}
