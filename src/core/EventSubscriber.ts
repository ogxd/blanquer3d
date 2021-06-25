import { arrayRemove } from "../core/Utils";

type Predicate<T> = (item: T) => void;

class EventSubscriber<EventData> {
  private _listeners: Predicate<EventData>[] = [];

  subscribe(predicate: Predicate<EventData>) {
    this._listeners.push(predicate);
  }

  unsubscribe(predicate: Predicate<EventData>) {
    this._listeners = arrayRemove(this._listeners, predicate);
  }

  dispatch(eventData: EventData) {
    for (const listener of this._listeners) {
      listener(eventData);
    }
  }
}

export default EventSubscriber;
