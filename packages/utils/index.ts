export const removeEmptyValuesFromObject = <T extends Record<string, unknown>>(
  object: T
): Partial<T> =>
  Object.entries(object).reduce((acc, [key, value]) => {
    if (value !== "" && value !== null && value !== undefined) {
      acc[key as keyof T] = value as T[keyof T];
    }
    return acc;
  }, {} as Partial<T>);

export function getTextByLanguage(
  textsByLocale: Record<string, string>
): string {
  const supportedLocales = Object.keys(textsByLocale);
  const defaultLocale = "jp"; // This can be adjusted to suit the application's default language
  const pathSegments = window.location.pathname.split("/");
  let locale = pathSegments[1] || defaultLocale;

  locale = supportedLocales.includes(locale) ? locale : defaultLocale;

  return textsByLocale[locale] || textsByLocale[defaultLocale] || "";
}
