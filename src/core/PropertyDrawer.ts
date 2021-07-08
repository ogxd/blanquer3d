import "reflect-metadata";

export class PropertyDrawersReg {
  static propertyDrawers = new Map<any, Function>();

  static drawProperty(object: any, propName: string, propType: string): any {
    return PropertyDrawersReg.propertyDrawers[propType](object, propName);
  }
}

export function propertyDrawer(type: any) {
  return function (target: any, methodName: string, descriptor: PropertyDescriptor): void {
    //var types = Reflect.getMetadata("design:paramtypes", target, methodName);
    //var typesName = types.map((a) => a.name).join();
    //console.log(type.name);
    //console.log(`methodName:${methodName}, types:${typesName}`);
    PropertyDrawersReg.propertyDrawers[type.name] = target[methodName];
  };
}
