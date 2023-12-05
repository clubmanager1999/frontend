export function unrapNestedFields<T>(obj: Record<string, T>, prefix: string) {
  const newObj: Record<string, T> = {};

  for (const [key, value] of Object.entries(obj)) {
    if (key.startsWith(prefix)) {
      newObj[key.replace(prefix, '')] = value;
    }
  }

  return newObj;
}
