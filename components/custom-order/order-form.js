import React from 'react';
import { Field, Form } from 'formik';
import CheckoutFields from '../cart/elements/checkout-fields';
import { useTranslation } from 'next-translate';
import { makeStyles } from '@material-ui/core/styles';
import { TextField } from 'formik-material-ui';

const useStyles = makeStyles(({ spacing }) => ({
  form: {
    maxWidth: '400px',
    marginBottom: spacing(3),
    '& > *': {
      marginBottom: spacing(2)
    }
  }
}));

const OrderForm = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const additionalFields = (
    <Field
      component={TextField}
      variant="outlined"
      fullWidth
      name="message"
      multiline
      rows={5}
      type="text"
      label={t('contacts:form.messageCustom')}
    />
  );
  return (
    <Form className={classes.form}>
      <CheckoutFields t={t} additionalFields={additionalFields} />
    </Form>
  );
};

export default OrderForm;
