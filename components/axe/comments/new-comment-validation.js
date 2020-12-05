import { string, object, number } from 'yup';

export let getSchema = (t, additional) =>
  object().shape({
    firstName: string()
      .min(3, t('common:errors.min3'))
      .required(t('common:errors.required')),
    email: string()
      .email(t('common:errors.email'))
      .required(t('common:errors.required')),
    content: string()
      .min(3, t('common:errors.min3'))
      .required(t('common:errors.required')),
    rating: number().nullable().min(1, 'Min 1').max(5, 'Max 5'),
    ...additional
  });
