interface ISceneObject {
  isVisible(): boolean;
  doTest(): void;
}

class SceneObject implements ISceneObject {
  isVisible(): boolean {
    throw new Error("Method not implemented.");
  }
  doTest(): void {
    throw new Error("Method not implemented.");
  }
}

export default SceneObject;
