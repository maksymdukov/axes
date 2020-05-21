/**
 *
 * @param {String} url
 * @param {Boolean} isSecure
 */

export const addPrefix = (url, isSecure = false) => {
  return `${isSecure ? 'https:' : 'http:'}${url}`;
};
