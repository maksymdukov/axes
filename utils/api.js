import { config } from '~/config/config';

const fetch = require('node-fetch');

export const apiRequest = async ({
  method = 'GET',
  url,
  data,
  options,
  baseUrl = location.origin
}) => {
  const response = await fetch(
    `${baseUrl}${url}`,
    options || {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }
  );
  if (!response.ok) {
    throw new Error('Not ok');
  }
  return response.json();
};

export const commentsApiRequest = (args) => {
  return apiRequest({ ...args, baseUrl: config.COMMENTS_SERVICE_URL });
};
