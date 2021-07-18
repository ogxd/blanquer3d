const registeredReflectables = new Map<string, Function>();

export function reflectable(constructor: any) {
  registeredReflectables[constructor.name] = () => new constructor();
  console.log(">>>");
  console.log(constructor);
  console.log(constructor.prototype);
}

export function reflect(numOfWheels: string) {
  return function (constructor: Function) {
    constructor.prototype.wheels = numOfWheels;
  };
}

export function createInstance(typeName: string): any {
  const ctor = registeredReflectables[typeName];
  if (ctor) {
    return ctor();
  }
  throw new Error(`Type ${typeName} is unregistered and can't be instanced`);
}
