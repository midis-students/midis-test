export function DeepRemove(obj: Record<string, unknown>, key: string) {
  for (const [property, value] of Object.entries(obj)) {
    if (property == key) delete obj[key];
    if (typeof value === 'object') {
      DeepRemove(obj[property] as typeof obj, key);
    }
  }
  return obj;
}
