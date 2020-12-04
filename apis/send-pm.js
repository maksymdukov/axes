import { apiRequest } from '~/utils/api';

export const sendMessage = async (data) => {
  return apiRequest({
    url: '/v1/pm',
    method: 'POST',
    data
  });
};
