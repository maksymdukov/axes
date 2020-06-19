import React, { useMemo } from 'react';
import { Formik } from 'formik';
import VerticalStepper from './vertical-stepper';
import { getValidationSchema } from './validators';
import { useTranslation } from 'next-translate';
import { sendCustomOrder } from '../../apis/client/send-custom-order';

const FormWrapper = () => {
  const { t } = useTranslation();
  const initialValues = {
    files: [],
    name: '',
    surname: '',
    email: '',
    phone: '',
    comments: '',
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
      formData.append('name', values.name);
      formData.append('surname', values.surname);
      formData.append('email', values.email);
      formData.append('phone', values.phone.replace(/\(|\)|-/g, ''));
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
        formData.append('comments', values.comments);
      }
      values.files.forEach((file, idx) => {
        formData.append(`file${idx}`, file);
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
