import Url from 'url-parse';
import i18Config from '~/i18n.json';
import { config } from '~/config/config';

/**
 *
 * @param {String} url
 * @param {Boolean} isSecure
 */

export const addPrefix = (image) => {
  return {
    width: image.width,
    height: image.height,
    url: `http:${image.url}`,
    urlSecure: `https:${image.url}`
  };
};

export const parseFullPath = (fullPath) => () => {
  const slugs = fullPath.split('/');
  let startIdx = 1;
  let language = i18Config.defaultLanguage;
  const notDefaultLanguage = i18Config.allLanguages.find(
    (lng) => lng === slugs[1] && lng !== i18Config.defaultLanguage
  );
  if (notDefaultLanguage) {
    startIdx = 2;
    language = notDefaultLanguage;
  }
  return {
    lang: language,
    path: '/' + slugs.slice(startIdx).join('/')
  };
};

export const parseUrl = (originalUrl) => {
  const url = new Url(originalUrl);
  url.isSameOrigin = url.hostname === config.PUBLIC_DOMAIN.toLowerCase();
  return url;
};
