import Validator from 'fastest-validator';
import contentfulConfig from '~/server/config/contentful';

const { locales } = contentfulConfig;

const SORT = {
  createdAt: 'createdAt',
  price: 'price'
};
const ORDER = {
  asc: 'asc',
  desc: 'desc'
};

export const v = new Validator();

export const schema = {
  order: {
    type: 'enum',
    values: [ORDER.asc, ORDER.desc],
    default: ORDER.desc
  },
  sort: {
    type: 'enum',
    values: [SORT.createdAt, SORT.price],
    default: SORT.createdAt
  },
  lang: {
    type: 'enum',
    values: [locales.ru, locales.uk],
    default: locales.ru
  },
  page: {
    type: 'number',
    min: 1,
    default: 1,
    integer: true,
    convert: true
  },
  size: {
    type: 'number',
    min: 1,
    max: 999,
    default: 10,
    integer: true,
    convert: true
  }
};
