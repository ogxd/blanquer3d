const registeredReflectables = new Map<number, Function>();

export function reflectable(id: number) {
  return function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    registeredReflectables[id] = () => new constructor();
    return class extends constructor {
      classId = id;
    };
  };
}

export function createInstance(typeName: string): any {
  const ctor = registeredReflectables[typeName];
  if (ctor) {
    return ctor();
  }
  throw new Error(`Type ${typeName} is unregistered and can't be instanced`);
}
