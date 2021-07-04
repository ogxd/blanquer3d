import { arrayRemove } from "../core/Utils";

type Predicate<T> = (item: T) => void;

class EventSubscriber<EventData> {
  private _listeners = new Array<Predicate<EventData>>();

  subscribe(owner: any, predicate: Predicate<EventData>) {
    predicate = predicate.bind(owner);
    this._listeners.push(predicate);
  }

  unsubscribe(predicate: Predicate<EventData>) {
    arrayRemove(this._listeners, predicate);
  }

  dispatch(eventData: EventData) {
    this._listeners.forEach((listener) => {
      listener(eventData);
    });
  }
}

export default EventSubscriber;
