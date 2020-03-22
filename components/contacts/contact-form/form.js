import React from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "next-translate";

const useStyles = makeStyles(({ spacing, breakpoints }) => ({
  mb: {
    marginBottom: spacing(2)
  },
  form: {
    width: "90%",
    maxWidth: "400px",
    margin: "auto",
    [breakpoints.down("xs")]: {
      marginTop: spacing(2)
    }
  }
}));

const ContactForm = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const initialValues = {
    name: "",
    email: "",
    phone: ""
  };
  return (
    <Formik initialValues={initialValues}>
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
            className={classes.mb}
          />
          <br />
          <Field
            component={TextField}
            fullWidth
            name="email"
            type="email"
            label={t("contacts:form.email")}
            className={classes.mb}
          />
          <br />
          <Field
            component={TextField}
            fullWidth
            name="phone"
            type="text"
            label={t("contacts:form.phone")}
            className={classes.mb}
          />
          <br />
          <Button
            type="button"
            disabled={isSubmitting}
            variant="contained"
            color="primary"
            onClick={submitForm}
          >
            {t("contacts:sendMessageBtn")}
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default ContactForm;
