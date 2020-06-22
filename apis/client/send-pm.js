import { serviceApiRequest } from '../../utils/api';

export const sendMessage = async (data) => {
  return serviceApiRequest({
    url: '/send-pm',
    method: 'POST',
    data
  });
};
