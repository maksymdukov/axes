import { serviceApiRequest } from '../../utils/api';

export const sendCustomOrder = async (formData) => {
  return serviceApiRequest({
    url: '/custom-order',
    options: {
      method: 'POST',
      body: formData
    }
  });
};
