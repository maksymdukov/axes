import { string, object } from 'yup';

export let getSchema = (t) =>
  object().shape({
    name: string()
      .min(3, t('contacts:form.errors.min3'))
      .required(t('contacts:form.errors.required')),
    email: string()
      .email(t('contacts:form.errors.email'))
      .required(t('contacts:form.errors.required')),
    phone: string().matches(
      /\+38\(\d{3}\)\d{3}-\d{2}-\d{2}/i,
      t('contacts:form.errors.phone')
    ),
    message: string()
      .min(3, t('contacts:form.errors.min3'))
      .max(5000)
      .required(t('contacts:form.errors.required'))
  });
