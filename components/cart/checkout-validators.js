import { string, object, mixed } from 'yup';

export let getSchema = (t, additional) =>
  object().shape({
    firstName: string()
      .min(3, t('common:errors.min3'))
      .required(t('common:errors.required')),
    lastName: string()
      .min(3, t('common:errors.min3'))
      .required(t('common:errors.required')),
    email: string()
      .email(t('common:errors.email'))
      .required(t('common:errors.required')),
    phone: string()
      .required(t('common:errors.required'))
      .matches(/\+38\(\d{3}\)\d{3}-\d{2}-\d{2}/i, t('common:errors.phone')),
    delivery: string().required(t('common:errors.required')),
    npBranch: mixed().when('delivery', {
      is: 'novaposhta',
      then: mixed(t('common:errors.number'))
        .typeError(t('common:errors.number'))
        .required(t('common:errors.required'))
    }),
    npSettlement: mixed().when('delivery', {
      is: 'novaposhta',
      then: mixed(t('common:errors.required')).required(
        t('common:errors.required')
      )
    }),
    ukrAddress: string().when('delivery', {
      is: 'ukrposhta',
      then: string().required(t('common:errors.required'))
    }),
    comment: string().min(3, t('common:errors.min3')).max(5000),
    ...additional
  });
