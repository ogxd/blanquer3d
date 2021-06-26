class Vector3 {
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  readonly x: number;
  readonly y: number;
  readonly z: number;

  static Add(a: Vector3, b: Vector3) {
    return new Vector3(a.x + b.x, a.y + b.y, a.z + b.z);
  }

  toString() {
    return `<x:${this.x} y:${this.y} z:${this.z}>`;
  }
}

export default Vector3;
