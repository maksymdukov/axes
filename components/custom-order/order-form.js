import React from 'react';
import { Form } from 'formik';
import CheckoutFields from '../cart/elements/checkout-fields';
import { useTranslation } from 'next-translate';
import { makeStyles } from '@material-ui/core/styles';

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
  return (
    <Form className={classes.form}>
      <CheckoutFields t={t} />
    </Form>
  );
};

export default OrderForm;
