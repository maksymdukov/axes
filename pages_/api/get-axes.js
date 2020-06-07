import { getAxes } from '~/actions/axe';
import contentfulConfig from '~/server/config/contentful';
import { AXES_SORT } from '~/actions/axe.constants';
import { schema, v } from '~/server/validation/get-axes.validators';

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
    sortOrder: contentfulConfig.C_SORT_ORDER[order]
  });

  res.json(axes);
};
