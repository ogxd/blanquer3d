import "reflect-metadata";

//let propertyTypes = new Map<any, any>();

interface IProperty {
  name: string;
  typeName: string;
}

export function property(target: any, propertyKey: string | symbol): any {
  // We need a unique key here because otherwise we would be
  // calling ourselves, and that results in an infinite loop.
  const key = Symbol();

  let lambdas = new Map<any, any>();

  if (!target.properties) {
    target.properties = [];
  }

  var type = Reflect.getMetadata("design:type", target, propertyKey);
  console.log(`Property on object: ${target}, with name: ${String(propertyKey)}, of type: ${type.name}`);
  console.log(target);

  //target.properties.push({ name: propertyKey, type: type.name });

  try {
    Object.defineProperty(target, "properties", {
      value: [],
      writable: false,
      configurable: false,
    });
  } catch {}

  target.properties.push({ name: propertyKey, type: type.name });

  return {
    get(): any {
      return this[key];
    },
    set(newValue: any) {
      // Unsubscribe if there was any nested subscription
      if (this[key]?.onPropertyChanged && lambdas[this]) {
        this[key].onPropertyChanged.unsubscribe(null, lambdas[this]);
      }

      // Set value
      this[key] = newValue;

      // Subscribe nested subscriptions
      if (this[key]?.onPropertyChanged) {
        this[key]?.onPropertyChanged?.subscribe(
          null,
          (lambdas[this] = () => this.onPropertyChanged.dispatch(propertyKey))
        );
      }

      // Trigger property changed event
      this.onPropertyChanged?.dispatch(propertyKey);
    },
  };
}
