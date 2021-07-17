const registeredReflectables = new Map<string, Function>();

export function reflectable(constructor: any) {
  registeredReflectables[constructor.name] = () => new constructor();
}

export function createInstance(typeName: string): any {
  return registeredReflectables[typeName]();
}
