import { string, object, number } from 'yup';

export let getSchema = (t, additional) =>
  object().shape({
    name: string()
      .min(3, t('common:errors.min3'))
      .required(t('common:errors.required')),
    surname: string()
      .min(3, t('common:errors.min3'))
      .required(t('common:errors.required')),
    email: string()
      .email(t('common:errors.email'))
      .required(t('common:errors.required')),
    phone: string()
      .required(t('common:errors.required'))
      .matches(/\+38\(\d{3}\)\d{3}-\d{2}-\d{2}/i, t('common:errors.phone')),
    delivery: string().required(t('common:errors.required')),
    npNumber: number().when('delivery', {
      is: 'novaposhta',
      then: number(t('common:errors.number'))
        .typeError(t('common:errors.number'))
        .required(t('common:errors.required'))
        .min(1, t('common:errors.number'))
    }),
    ukrAddress: string().when('delivery', {
      is: 'ukrposhta',
      then: string().required(t('common:errors.required'))
    }),
    comments: string().min(3, t('common:errors.min3')).max(5000),
    ...additional
  });
