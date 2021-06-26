import { expect } from "chai";
import EventSubscriber from "../src/core/EventSubscriber";
import { property } from "../src/core/PropertyDecorator";

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

  it("PropertyDecorator", () => {
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

  it("PropertyDecorator Nested", () => {
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
  });
});
