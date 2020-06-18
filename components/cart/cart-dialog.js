import React, { useEffect, useMemo, useState } from 'react';
import { Box, Dialog, DialogContent, DialogTitle } from '@material-ui/core';
import { useTranslation } from 'next-translate';
import IconButton from '@material-ui/core/IconButton';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import Cart from './cart';
import CheckoutForm from './checkout-form';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import { useCart } from '../../context/cart/hooks';
import { getSchema } from './checkout-validators';
import SuccessScreen from './success-screen';
import { sendOrder } from '../../apis/client/send-order';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  titleBg: {
    backgroundColor: palette.primary.light,
    color: palette.primary.contrastText
  },
  dialog: {
    [breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}));

const CartDialog = ({ isOpened, handleClose }) => {
  const classes = useStyles();
  const [screen, setScreen] = useState(1);
  const [error, setError] = useState(null);
  const [initValues, setInitValues] = useState({
    name: '',
    surname: '',
    email: '',
    phone: '',
    delivery: '',
    npNumber: '',
    ukrAddress: ''
  });
  const { t } = useTranslation();
  const { cart, clearCart } = useCart();

  // Calculate total price
  const totalPrice = useMemo(() => {
    return cart.items.reduce(
      (accumulator, item) => accumulator + item.price * item.count,
      0
    );
  }, [cart]);

  // Preload contact data if user filled it before
  useEffect(() => {
    const contacts = localStorage.getItem('contacts');
    if (contacts && isOpened) {
      setInitValues(JSON.parse(contacts));
    }
  }, [isOpened]);

  // Show cart next time after dialog is closed
  const handleDialogClose = () => setScreen(1);

  const schema = useMemo(() => getSchema(t), []);

  const doSendOrder = async (values, { setSubmitting }) => {
    try {
      setError(null);
      if (!values.npNumber) {
        delete values.npNumber;
      }
      if (!values.ukrAddress) {
        delete values.ukrAddress;
      }
      await sendOrder({
        ...values,
        phone: values.phone.replace(/\(|\)|-/g, ''),
        items: cart.items
      });
      setScreen(3);
      clearCart();
    } catch (e) {
      console.error(e);
      setError('Произошла ошибка. Попробуйте позже');
    }
    setSubmitting(false);
  };
  return (
    <Dialog
      classes={{
        paperWidthMd: classes.dialog
      }}
      onExited={handleDialogClose}
      open={isOpened}
      onClose={handleClose}
      maxWidth="md"
      scroll="body"
    >
      <DialogTitle className={classes.titleBg}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <span>
            {screen === 1 && t('common:cart.title')}
            {(screen === 2 || screen === 3) && t('common:checkout.title')}
          </span>
          <IconButton color="inherit" onClick={handleClose} size="small">
            <HighlightOffIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Formik
          initialValues={initValues}
          validationSchema={schema}
          enableReinitialize
          onSubmit={doSendOrder}
        >
          {({ isSubmitting, handleSubmit, values }) => (
            <>
              {screen === 1 && (
                <Cart
                  totalPrice={totalPrice}
                  onNextClick={() => setScreen(2)}
                />
              )}
              {screen === 2 && (
                <CheckoutForm
                  error={error}
                  values={values}
                  totalPrice={totalPrice}
                  onBackClick={() => setScreen(1)}
                  isSubmitting={isSubmitting}
                  onSubmit={handleSubmit}
                />
              )}
              {screen === 3 && <SuccessScreen />}
            </>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
