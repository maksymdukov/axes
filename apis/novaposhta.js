import { locales } from './axe.constants';
import { apiRequest } from '~/utils/api';

export const findSettlements = ({ locale, query, signal }) =>
  apiRequest({
    url: `/v1/delivery/novaposhta/settlements`,
    params: {
      locale: locales[locale],
      query
    },
    signal
  });

export const findWarehouses = ({ settlementRef, locale }) =>
  apiRequest({
    url: `/v1/delivery/novaposhta/warehouses/${settlementRef}`,
    params: {
      locale: locales[locale]
    }
  });
