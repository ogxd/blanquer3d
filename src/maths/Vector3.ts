import { ISerializable } from "src/core/Serialization";

class Vector3 implements ISerializable {
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  serialize(object: any) {
    object["x"] = this.x;
    object["y"] = this.y;
    object["z"] = this.z;
  }

  deserialize(object: any) {
    this.x = object["x"];
    this.y = object["y"];
    this.z = object["z"];
  }

  x: number;
  y: number;
  z: number;

  length(): number {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize(): Vector3 {
    const length = this.length();
    return new Vector3(this.x / length, this.y / length, this.z / length);
  }

  static readonly ZERO: Vector3 = new Vector3(0, 0, 0);

  static Add(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
  }

  static Substract(a: Vector3, b: Vector3): Vector3 {
    return new Vector3(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  static Multiply(a: Vector3, b: number): Vector3 {
    return new Vector3(a.x * b, a.y * b, a.z * b);
  }

  static Dot(lhs: Vector3, rhs: Vector3): number {
    return lhs.x * rhs.x + lhs.y * rhs.y + lhs.z * rhs.z;
  }

  static FindNearestPointOnLine(origin: Vector3, direction: Vector3, point: Vector3): Vector3 {
    const normalized = direction.normalize();
    const lhs = Vector3.Substract(point, origin);

    const dotP = Vector3.Dot(lhs, normalized);
    return Vector3.Add(origin, Vector3.Multiply(normalized, dotP));
  }

  toString() {
    return `<x:${this.x} y:${this.y} z:${this.z}>`;
  }
}

export default Vector3;
