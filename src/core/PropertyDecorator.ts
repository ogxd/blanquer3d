export function property(): any {
  return (target: any, propertyKey: string | symbol) => {
    // We need a unique key here because otherwise we would be
    // calling ourselves, and that results in an infinite loop.
    const key = Symbol();

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
        this[key] = newValue;
        this.onPropertyChanged.dispatch(propertyKey);
      },
    };
  };
}
