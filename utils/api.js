import { config } from '~/config/config';

export const apiRequest = async ({
  method = 'GET',
  url,
  data,
  options = {},
  baseUrl = config.API_SERVICE_URL,
  params,
  signal
}) => {
  const qs = getQueryString(params);
  const targetUrl = `${baseUrl}${url}${qs ? '?' + qs : ''}`;
  const response = await fetch(targetUrl, {
    signal,
    method,
    headers: { 'Content-Type': 'application/json' },
    body: data ? JSON.stringify(data) : undefined,
    ...options
  });
  let json;
  try {
    json = await response.json();
  } catch (error) {
    json = null;
  }
  if (!response.ok) {
    return Promise.reject(json);
  }
  return json;
};

export const serviceApiRequest = (args) => {
  return apiRequest({ ...args, baseUrl: config.API_SERVICE_URL });
};

export const getQueryString = (params = {}) => {
  return Object.keys(params).reduce((acc, key) => {
    if (params[key] !== undefined) {
      const qs = `${key}=${params[key]}`;
      let and = '&';
      if (acc) {
        return `${acc}${and}${qs}`;
      }
      return acc + qs;
    }
    return acc;
  }, '');
};
