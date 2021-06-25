import { useIsFocusVisible } from "@material-ui/core";

interface IScene {
  isVisible(): boolean;
  doTest(): void;
}

class Scene implements IScene {
  isVisible(): boolean {
    throw new Error("Method not implemented.");
  }
  doTest(): void {
    throw new Error("Method not implemented.");
  }
}

export default Scene;
