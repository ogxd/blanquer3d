export function arrayRemove<T>(arr: T[], value: T) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}
