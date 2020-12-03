import i18nConfig from '../i18n.json';

const { locales, defaultLocale } = i18nConfig;

const LANGUAGE_KEY = 'language';

export const getUserLanguageSetting = () => {
  return localStorage.getItem(LANGUAGE_KEY);
};

export const setUserLanguageSetting = (lang) => {
  const lng = lang || getCurrentLanguage();
  return localStorage.setItem(LANGUAGE_KEY, lng);
};

export const getCurrentLanguage = () => {
  const slugs = window.location.pathname.split('/');
  const currLang = locales.find((lng) => lng === slugs[1]);
  return currLang || defaultLocale;
};
