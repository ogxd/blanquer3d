import "reflect-metadata";

let propertyDrawers = new Map<any, Function>();

export function drawProperty(object: any, propName: string, propType: string): any {
  return propertyDrawers[propType](object, propName);
}

export function propertyDrawer(type: any) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor): void {
    //var types = Reflect.getMetadata("design:paramtypes", target, methodName);
    //var typesName = types.map((a) => a.name).join();
    //console.log(type.name);
    //console.log(`methodName:${methodName}, types:${typesName}`);
    propertyDrawers[type.name] = target[methodName];
  };
}
