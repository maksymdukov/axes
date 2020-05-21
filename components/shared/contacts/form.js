import React from 'react';
import { Field, Form } from 'formik';
import { TextField } from 'formik-material-ui';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { useTranslation } from 'next-translate';
import PhoneInput from '../../shared/inputs/phone-input';
import Box from '@material-ui/core/Box';
import { CircularProgress } from '@material-ui/core';
import clsx from 'clsx';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';

const useStyles = makeStyles(({ spacing, palette }) => ({
  form: {
    maxWidth: '400px',
    '& > *': {
      marginBottom: spacing(2)
    }
  },
  successIcon: {
    color: palette.success.main
  }
}));

const ContactsGenericForm = ({
  isSuccess,
  isSubmitting,
  onSubmit,
  netError,
  disableSubmit = false,
  customLabel = false,
  className
}) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Form className={clsx(classes.form, className)}>
      <Field
        component={TextField}
        fullWidth
        name="name"
        type="text"
        label={t('contacts:form.name')}
      />
      <br />
      <Field
        component={TextField}
        fullWidth
        name="email"
        type="text"
        label={t('contacts:form.email')}
      />
      <br />
      <Field
        component={PhoneInput}
        fullWidth
        placeholder="+38(___)___-__-__"
        name="phone"
        type="text"
        label={t('contacts:form.phone')}
      />
      <br />
      <Field
        component={TextField}
        variant="outlined"
        fullWidth
        name="message"
        multiline
        rows={5}
        type="text"
        label={
          customLabel
            ? t('contacts:form.messageCustom')
            : t('contacts:form.message')
        }
      />
      {!!netError && <Typography color="error">{netError}</Typography>}
      {!disableSubmit && (
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Button
            type="button"
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            onClick={onSubmit}
          >
            {t('contacts:sendMessageBtn')}
          </Button>
          {isSubmitting && <CircularProgress size="2rem" />}
          {isSuccess && <DoneOutlineIcon className={classes.successIcon} />}
        </Box>
      )}
    </Form>
  );
};

export default ContactsGenericForm;
