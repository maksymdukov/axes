import { getSchema } from '../cart/checkout-validators';
import { string } from 'yup';

export const getValidationSchema = (t) =>
  getSchema(t, {
    message: string().min(3, t('contacts:form.errors.min3')).max(5000)
  });
