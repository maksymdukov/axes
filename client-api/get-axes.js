import { apiRequest } from '~/utils/api';
import { getQueryString } from '~/utils/url';

export const getAxesApi = ({ page, size, sort, order, lang }) => {
  const qs = getQueryString([
    { name: 'page', value: page },
    { name: 'size', value: size },
    { name: 'sort', value: sort },
    { name: 'order', value: order },
    { name: 'lang', value: lang }
  ]);
  return apiRequest({
    url: `/api/get-axes${qs}`
  });
};
