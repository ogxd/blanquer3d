import { expect } from "chai";
import EventSubscriber from "../src/core/EventSubscriber";

describe("Core", () => {
  it("EventSubscriber", () => {
    var eventSubscriber = new EventSubscriber<number>();
    var k = 0;

    function onEvent(n: number) {
      k += n;
    }

    eventSubscriber.subscribe(onEvent);
    expect(k).to.be.equal(0);

    eventSubscriber.dispatch(1);
    expect(k).to.be.equal(1);

    eventSubscriber.dispatch(3);
    expect(k).to.be.equal(4);

    eventSubscriber.unsubscribe(onEvent);
    expect(k).to.be.equal(4);

    eventSubscriber.dispatch(7);
    expect(k).to.be.equal(4);
  });
});
