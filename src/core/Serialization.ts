import { PointFromPosition } from "src/scene/primitives/PointFromPosition";
import { PointOnLine } from "src/scene/primitives/PointOnLine";
import Scene from "../scene/Scene";

export interface ISerializable {
  serialize(object: any);
  deserialize(object: any);
}

export function createInstance(type: string): any {
  switch (type) {
    case "Scene":
      return new Scene();
    case "PointFromPosition":
      return new PointFromPosition();
    case "PointOnLine":
      return new PointOnLine();
  }
}
