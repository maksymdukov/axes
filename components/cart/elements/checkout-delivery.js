import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import { Field, useFormikContext } from 'formik';
import { Select, TextField } from 'formik-material-ui';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import { useTranslation } from 'next-translate';
import FormHelperText from '@material-ui/core/FormHelperText';

const useStyles = makeStyles(() => ({
  formControl: {
    minWidth: 120
  },
  icon: {
    width: '1rem',
    height: '1rem',
    marginRight: 5
  }
}));

const CheckoutDelivery = () => {
  const { values, touched, errors } = useFormikContext();
  const { t } = useTranslation();
  const classes = useStyles();
  const name = 'delivery';
  return (
    <>
      <FormControl
        className={classes.formControl}
        error={touched[name] && !!errors[name]}
      >
        <InputLabel id="delivery-select">
          {t('common:checkout.delivery')}
        </InputLabel>
        <Field
          labelId="delivery-select"
          name={name}
          label={t('common:checkout.delivery')}
          component={Select}
        >
          <MenuItem value="novaposhta">
            <img
              className={classes.icon}
              alt="Nova poshta"
              src="/assets/svg/nova-poshta.svg"
            />{' '}
            {t('common:checkout.np')}
          </MenuItem>
          <MenuItem value="ukrposhta">
            <img
              className={classes.icon}
              alt="Ukr poshta"
              src="/assets/svg/ukr-poshta.svg"
            />{' '}
            {t('common:checkout.up')}
          </MenuItem>
        </Field>
        {touched[name] && errors[name] && (
          <FormHelperText>{errors[name]}</FormHelperText>
        )}
      </FormControl>
      {values.delivery === 'novaposhta' && (
        <Field
          name="npNumber"
          label={t('common:checkout.npNumber')}
          component={TextField}
          fullWidth
        />
      )}
      {values.delivery === 'ukrposhta' && (
        <Field
          name="ukrAddress"
          label={t('common:checkout.ukrAddress')}
          component={TextField}
          fullWidth
        />
      )}
    </>
  );
};

export default CheckoutDelivery;
