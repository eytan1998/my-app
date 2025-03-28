export enum directions {
  ltr = 'ltr',
  rtl = 'rtl',
}
export enum languages {
  en = 'en',
  he = 'he',
  // add
}
export const DEFAULT_LANGUAGE = languages.en; 

export const LanguageConfig = {
  [languages.en]: {
    name: 'English',
    direction: directions.ltr,
  },
  [languages.he]: {
    name: 'עברית',
    direction: directions.rtl,
  },
  // add
  };
  