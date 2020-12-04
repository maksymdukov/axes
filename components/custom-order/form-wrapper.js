import React, { useMemo } from 'react';
import { Formik } from 'formik';
import VerticalStepper from './vertical-stepper';
import { getValidationSchema } from './validators';
import useTranslation from 'next-translate/useTranslation';
import { sendCustomOrder } from '../../apis/send-custom-order';
import { sanitizePhone } from '~/utils/sanitizers';

const FormWrapper = () => {
  const { t } = useTranslation();
  const initialValues = {
    files: [],
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    comment: '',
    delivery: '',
    npSettlement: '',
    npNumber: '',
    ukrAddress: ''
  };
  const [activeStep, setActiveStep] = React.useState(0);

  const validationSchema = useMemo(() => getValidationSchema(t), []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append('firstName', values.firstName);
      formData.append('lastName', values.lastName);
      formData.append('email', values.email);
      formData.append('phone', sanitizePhone(values.phone));
      formData.append('delivery', values.delivery);
      if (values.npNumber) {
        formData.append('npNumber', values.npNumber);
      }
      if (values.npSettlement) {
        formData.append('npSettlement', values.npSettlement);
      }
      if (values.ukrAddress) {
        formData.append('ukrAddress', values.ukrAddress);
      }
      if (values.comments) {
        formData.append('comment', values.comment);
      }
      values.files.forEach((file) => {
        formData.append(`images`, file);
      });

      await sendCustomOrder(formData);
      setActiveStep((step) => step + 2);
    } catch (e) {
      console.error(e);
    }
    setSubmitting(false);
  };
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {(props) => (
        <VerticalStepper {...props} {...{ activeStep, setActiveStep }} />
      )}
    </Formik>
  );
};

export default FormWrapper;
