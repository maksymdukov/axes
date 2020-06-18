import { serviceApiRequest } from '../../utils/api';

export const sendOrder = async (data) => {
  return serviceApiRequest({
    url: '/order',
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    data
  });
};
