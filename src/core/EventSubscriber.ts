import * as Blanquer3d from "src/blanquer3d";

type Predicate<T> = (item: T) => void;

export class EventSubscriber<EventData> {
  private _listeners = new Array<Predicate<EventData>>();

  subscribe(owner: any, predicate: Predicate<EventData>) {
    if (owner) {
      predicate = predicate.bind(owner);
    }
    this._listeners.push(predicate);
  }

  unsubscribe(owner: any, predicate: Predicate<EventData>) {
    if (owner) {
      predicate = predicate.bind(owner);
    }
    Blanquer3d.arrayRemove(this._listeners, predicate);
  }

  dispatch(eventData: EventData) {
    this._listeners.forEach((listener) => {
      listener(eventData);
    });
  }
}
