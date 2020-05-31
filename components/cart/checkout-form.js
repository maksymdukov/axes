import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-translate';
import Box from '@material-ui/core/Box';
import CtaButton from '../shared/buttons/cta-button';
import Typography from '@material-ui/core/Typography';
import { CircularProgress } from '@material-ui/core';
import CheckoutFields from './elements/checkout-fields';

const useStyles = makeStyles(({ spacing }) => ({
  form: {
    width: '100%',
    maxWidth: '350px',
    margin: 'auto',
    '& > *': {
      marginBottom: spacing()
    }
  },
  summary: {
    fontWeight: '300'
  }
}));

const CheckoutForm = ({
  error,
  onBackClick,
  isSubmitting,
  onSubmit,
  totalPrice,
  values
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(values));
  }, [values]);
  return (
    <>
      <Box my={3}>
        <Typography
          className={classes.summary}
          variant="h5"
          align="center"
          color="textSecondary"
        >
          {t('common:checkout.total')}: {totalPrice} грн
        </Typography>
      </Box>
      <div className={classes.form}>
        <CheckoutFields t={t} />
        {!!error && <Typography color="error">{error}</Typography>}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Button color="primary" type="button" onClick={onBackClick}>
            {t('common:checkout.back')}
          </Button>
          {isSubmitting && <CircularProgress size={30} />}
          {!isSubmitting && (
            <CtaButton type="button" disabled={isSubmitting} onClick={onSubmit}>
              {t('common:checkout.order')}
            </CtaButton>
          )}
        </Box>
      </div>
    </>
  );
};

export default CheckoutForm;
