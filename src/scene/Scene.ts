import EventSubscriber from "../core/EventSubscriber";

interface IScene {}

class Scene implements IScene {
  readonly onObjectAdded = new EventSubscriber<string>();
}

export default Scene;
