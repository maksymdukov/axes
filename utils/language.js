import i18nConfig from '../i18n.json';

const { allLanguages, defaultLanguage } = i18nConfig;

export const getUserLanguageSetting = () => {
  return localStorage.getItem('language');
};

export const setUserLanguageSetting = (lang) => {
  const lng = lang || getCurrentLanguage();
  return localStorage.setItem('language', lng);
};

export const getCurrentLanguage = () => {
  const slugs = window.location.pathname.split('/');
  const currLang = allLanguages.find((lng) => lng === slugs[1]);
  return currLang || defaultLanguage;
};
