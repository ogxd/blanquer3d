export function arrayRemove<T>(arr: T[], value: T) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i] === value) {
      arr.splice(i, 1);
      i--;
    }
  }
}
