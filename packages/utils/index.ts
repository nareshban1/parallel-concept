export const removeEmptyValuesFromObject = <T extends Record<string, unknown>>(
  object: T
): Partial<T> =>
  Object.entries(object).reduce((acc, [key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      acc[key as keyof T] = value as T[keyof T];
    }
    return acc;
  }, {} as Partial<T>);
