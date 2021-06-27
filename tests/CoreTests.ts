import { expect } from "chai";
import EventSubscriber from "../src/core/EventSubscriber";
import { property } from "../src/core/PropertyDecorator";

describe("core", () => {
  it("EventSubscriber can subscribe, unsubscribe and dispatch events", () => {
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

  it("PropertyDecorator can handle property changes", () => {
    class MyObject {
      @property()
      myProperty: string;
      readonly onPropertyChanged = new EventSubscriber<string>();
    }

    var myObject = new MyObject();

    var result: string = "";

    myObject.onPropertyChanged.subscribe((x) => {
      result += `[${x}=${myObject[x]}]`;
    });

    myObject.myProperty = "hello";

    expect(myObject.myProperty).to.be.equal("hello");
    expect(result).to.be.equal("[myProperty=hello]");
  });

  it("PropertyDecorator can handle nested property changes", () => {
    class MyNestedObject {
      @property()
      myNestedProperty: string;
      readonly onPropertyChanged = new EventSubscriber<string>();
      toString() {
        return "nested" + this.myNestedProperty;
      }
    }

    class MyObject {
      @property()
      myProperty: MyNestedObject;
      readonly onPropertyChanged = new EventSubscriber<string>();
    }

    var myObject = new MyObject();

    var result: string = "";

    myObject.myProperty = new MyNestedObject();

    myObject.onPropertyChanged.subscribe((x) => {
      result += `[${x}=${myObject[x]}]`;
    });

    myObject.myProperty.myNestedProperty = "hello";

    expect(result).to.be.equal("[myProperty=nestedhello]");

    // Now we test that changing the object corretly unsubcribes the old object property changed events
    var newNestedObject = new MyNestedObject();
    newNestedObject.myNestedProperty = "byebye";

    var oldNestedObject = myObject.myProperty;
    myObject.myProperty = newNestedObject;

    // This should not trigger an event since the old object is not connected to myObject anymore
    oldNestedObject.myNestedProperty = "azerty";

    expect(result).to.be.equal(
      "[myProperty=nestedhello][myProperty=nestedbyebye]"
    );
  });
});
