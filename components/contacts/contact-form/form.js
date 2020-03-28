import React, { useMemo, useState } from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "next-translate";
import PhoneInput from "../../shared/inputs/phone-input";
import { getSchema } from "./validators";
import { sendMessage } from "../../../actions/contacts";
import Box from "@material-ui/core/Box";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  mb: {
    marginBottom: spacing(2)
  },
  form: {
    width: "90%",
    maxWidth: "400px",
    margin: "auto",
    "& > *": {
      marginBottom: spacing(2)
    },
    [breakpoints.down("xs")]: {
      marginTop: spacing(2)
    }
  }
}));

const ContactForm = () => {
  const { t, lang } = useTranslation();
  const [netError, setNetError] = useState(null);
  const classes = useStyles();
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: ""
  };
  const schema = useMemo(() => getSchema(t), [lang, t]);
  const onSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      setNetError(null);
      await sendMessage(values);
      resetForm();
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
        <Form className={classes.form}>
          <Typography align="center" variant="h5" color="textSecondary">
            {t("contacts:sendMessageTitle")}
          </Typography>
          <Field
            component={TextField}
            fullWidth
            name="name"
            type="text"
            label={t("contacts:form.name")}
          />
          <br />
          <Field
            component={TextField}
            fullWidth
            name="email"
            type="text"
            label={t("contacts:form.email")}
          />
          <br />
          <Field
            component={PhoneInput}
            fullWidth
            placeholder="+38(___)___-__-__"
            name="phone"
            type="text"
            label={t("contacts:form.phone")}
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
            label={t("contacts:form.message")}
          />
          <Typography color="error">{netError}</Typography>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              type="button"
              disabled={isSubmitting}
              variant="contained"
              color="primary"
              onClick={submitForm}
            >
              {t("contacts:sendMessageBtn")}
            </Button>
            {isSubmitting && <CircularProgress size="2rem" />}
          </Box>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
