const registeredReflectables = new Map<string, Function>();

export function reflectable(typeName: string) {
  return function (constructor: any) {
    registeredReflectables[typeName] = () => new constructor();
  };
}

export function createInstance(typeName: string): any {
  const ctor = registeredReflectables[typeName];
  if (ctor) {
    return ctor();
  }
  throw new Error(`Type ${typeName} is unregistered and can't be instanced`);
}
