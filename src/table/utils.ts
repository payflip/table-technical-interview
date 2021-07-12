export function toPascalCase(str: string) {
  if (str === undefined || str === null || str.length === 0) {
    return '';
  }
  return `${str[0]?.toUpperCase()}${str.substr(1)}`;
}

//follows a path within object graph and return the value at the given path
export function get(
  path: string | undefined,
  obj: Record<string, unknown>
): string | number | null {
  if (path === undefined) {
    throw new Error(`path cannot be undefined`);
  }

  if (obj === undefined || obj === null) {
    throw new Error(`obj cannot be undefined or null`);
  }

  const pathArr = path.split('.');

  if (pathArr.length === 0) {
    return `${obj}`;
  }

  let result = obj;

  for (const segment of pathArr) {
    if (segment in result) {
      const accessed = result[segment];
      result = accessed as Record<string, unknown>;
    } else {
      return null;
    }
  }

  return `${result}`;
}
