import React, { useMemo } from "react";
import { Formik } from "formik";
import VerticalStepper from "./vertical-stepper";
import { getValidationSchema } from "./validators";
import { useTranslation } from "next-translate";
import { sendCustomOrder } from "../../actions/custom-order";

const FormWrapper = () => {
  const { t } = useTranslation();
  const initialValues = {
    files: [],
    name: "",
    surname: "",
    email: "",
    phone: "",
    message: "",
    delivery: "",
    npNumber: "",
    ukrAddress: ""
  };
  const [activeStep, setActiveStep] = React.useState(0);

  const validationSchema = useMemo(() => getValidationSchema(t), []);

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("surname", values.surname);
      formData.append("email", values.email);
      formData.append("phone", values.phone);
      formData.append("delivery", values.delivery);
      formData.append("npNumber", values.npNumber);
      formData.append("ukrAddress", values.ukrAddress);
      formData.append("message", values.message);
      values.files.forEach((file, idx) => {
        formData.append(`${idx}-${file.name}`, file);
      });

      await sendCustomOrder(formData);
      setActiveStep(step => step + 2);
    } catch (e) {}
    setSubmitting(false);
  };
  return (
    <Formik
      onSubmit={handleSubmit}
      initialValues={initialValues}
      validationSchema={validationSchema}
    >
      {props => (
        <VerticalStepper {...props} {...{ activeStep, setActiveStep }} />
      )}
    </Formik>
  );
};

export default FormWrapper;
