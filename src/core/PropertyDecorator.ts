import "reflect-metadata";

//let propertyTypes = new Map<any, any>();

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

  target.properties.push({ name: propertyKey, type: type.name });

  // We can return a property descriptor that is used to define
  // a property on the target given the `propertyKey`.
  return {
    get(): any {
      // Read the value from the target instance using the
      // unique symbol from above
      return this[key];
    },
    set(newValue: any) {
      // Clamp the value and write it onto the target instance
      // using the unique symbol from above
      this[key]?.onPropertyChanged?.unsubscribe(lambdas[this]);
      this[key] = newValue;
      this[key]?.onPropertyChanged?.subscribe((lambdas[this] = () => this.onPropertyChanged.dispatch(propertyKey)));
      this.onPropertyChanged?.dispatch(propertyKey);
    },
  };
}
