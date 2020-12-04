import { apiRequest } from '../utils/api';

export const sendCustomOrder = async (formData) => {
  return apiRequest({
    url: '/v1/orders/custom',
    method: 'POST',
    options: {
      body: formData,
      headers: {}
    }
  });
};
