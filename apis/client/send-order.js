import { apiRequest } from '../../utils/api';

export const sendOrder = async (data) => {
  return apiRequest({
    url: '/api/send-order',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  });
};
