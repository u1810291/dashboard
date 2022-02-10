export function isPromise(obj: any) {
  return !!obj && obj instanceof Promise;
}
