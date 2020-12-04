import React, { useMemo, useState } from 'react';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import useTranslation from 'next-translate/useTranslation';
import { getSchema } from './validators';
import { sendMessage } from '~/apis/send-pm';
import ContactsGenericForm from '../../shared/contacts/form';
import { sanitizePhone } from '~/utils/sanitizers';

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  form: {
    width: '90%',
    margin: 'auto',
    [breakpoints.down('xs')]: {
      marginTop: spacing(2)
    }
  }
}));

const ContactForm = () => {
  const classes = useStyles();
  const { t, lang } = useTranslation();
  const [netError, setNetError] = useState(null);
  const [success, setSuccess] = useState(false);
  const initialValues = {
    firstName: '',
    email: '',
    phone: '',
    message: ''
  };
  const schema = useMemo(() => getSchema(t), [lang, t]);
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSuccess(false);
      setNetError(null);
      if (!values.phone) {
        delete values.phone;
      }
      await sendMessage({
        ...values,
        ...(values.phone && { phone: sanitizePhone(values.phone) })
      });
      resetForm();
      setSuccess(true);
    } catch (e) {
      console.error(e);
      setNetError('Произошла ошибка, попробуйте позже');
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <Formik
      validationSchema={schema}
      initialValues={initialValues}
      onSubmit={onSubmit}
    >
      {({ submitForm, isSubmitting }) => (
        <ContactsGenericForm
          className={classes.form}
          onSubmit={submitForm}
          isSubmitting={isSubmitting}
          netError={netError}
          isSuccess={success}
        />
      )}
    </Formik>
  );
};

export default ContactForm;
