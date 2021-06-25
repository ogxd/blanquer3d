interface IPrimitive {
  isVisible(): boolean;
  doTest(): void;
}

class Primitive implements IPrimitive {
  isVisible(): boolean {
    throw new Error("Method not implemented.");
  }
  doTest(): void {
    throw new Error("Method not implemented.");
  }
}

export default Primitive;
