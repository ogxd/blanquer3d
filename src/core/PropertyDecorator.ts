import "reflect-metadata";

export function property(target: any, propertyKey: string): any {
  // We need a unique key here because otherwise we would be
  // calling ourselves, and that results in an infinite loop.
  const key = Symbol();

  const lambdas = new Map<any, Function>();

  const type = Reflect.getMetadata("design:type", target, propertyKey);
  //console.log(`Property on object: ${target}, with name: ${String(propertyKey)}, of type: ${type.name}`);

  // Define metadata in order to help retreiving it later of a given object
  // Supports inheritance
  Reflect.defineMetadata("custom:property", type.name, target, propertyKey);
  //console.log("define metadata: " + target + ", property: " + propertyKey);

  return {
    enumerable: true,
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

interface IPropertyDescription {
  propertyName: string;
  typeName: string;
}

export function getProperties(selectedObject: any): IPropertyDescription[] {
  // javascript 🤮
  let properties = Object.keys(selectedObject);
  let prototype = selectedObject;
  while ((prototype = Object.getPrototypeOf(prototype))) {
    properties = Object.keys(prototype).concat(properties);
  }
  return properties
    .filter((property) => Reflect.hasMetadata("custom:property", selectedObject, property))
    .map(function (property): IPropertyDescription {
      return { propertyName: property, typeName: Reflect.getMetadata("custom:property", selectedObject, property) };
    });
}
