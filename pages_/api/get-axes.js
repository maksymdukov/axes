import Validator from 'fastest-validator';
import { getAxes } from '~/actions/axe';
import config from '~/server/config/contentful';
import { AXES_SORT } from '~/actions/axe.constants';

const SORT = {
  createdAt: 'createdAt',
  price: 'price'
};
const ORDER = {
  asc: 'asc',
  desc: 'desc'
};

const v = new Validator();

const schema = {
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
    values: [config.locales.ru, config.locales.ua],
    default: config.locales.ru
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

export default async (req, res) => {
  if (req.method !== 'GET') {
    res.statusCode = 404;
    return res.end();
  }
  const errors = v.validate(req.query, schema);
  if (errors !== true) {
    return res.status(422).send(errors);
  }
  const { order, sort, lang, page, size } = req.query;

  const axes = await getAxes({
    lang,
    page,
    size,
    sort: AXES_SORT[sort],
    sortOrder: config.C_SORT_ORDER[order]
  });

  res.json(axes);
};
