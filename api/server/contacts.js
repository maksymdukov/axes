import { apiRequest } from '../../utils/api';

export const sendMessage = async (data) => {
  return apiRequest({
    url: '/api/send-pm',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  });
};
