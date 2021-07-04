import "reflect-metadata";

let propertyDrawers = new Map<any, Function>();

export function drawProperty(propertyTypeName: string, argument: any): any {
  return propertyDrawers[propertyTypeName](argument);
}

export function propertyDrawer(target: any, methodName: string, descriptor: PropertyDescriptor): void {
  var types = Reflect.getMetadata("design:paramtypes", target, methodName);
  var typesName = types.map((a) => a.name).join();
  propertyDrawers[String(typesName)] = target[methodName];
}
