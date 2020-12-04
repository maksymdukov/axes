import { apiRequest } from '../../utils/api';

export const sendOrder = async (data) => {
  return apiRequest({
    url: '/v1/orders',
    method: 'POST',
    data
  });
};
