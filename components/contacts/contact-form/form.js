import React, { useMemo, useState } from "react";
import { Formik } from "formik";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-translate";
import { getSchema } from "./validators";
import { sendMessage } from "../../../actions/contacts";
import ContactsGenericForm from "../../shared/contacts/form";

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  form: {
    width: "90%",
    margin: "auto",
    [breakpoints.down("xs")]: {
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
    name: "",
    email: "",
    phone: "",
    message: ""
  };
  const schema = useMemo(() => getSchema(t), [lang, t]);
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setSuccess(false);
      setNetError(null);
      await sendMessage(values);
      resetForm();
      setSuccess(true);
    } catch (e) {
      setNetError("Произошла ошибка, попробуйте позже");
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
