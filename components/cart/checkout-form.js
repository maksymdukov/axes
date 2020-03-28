import React, { useEffect } from "react";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useTranslation } from "next-translate";
import Box from "@material-ui/core/Box";
import CtaButton from "../shared/buttons/cta-button";
import Typography from "@material-ui/core/Typography";
import CheckoutDelivery from "./elements/checkout-delivery";
import PhoneInput from "../shared/inputs/phone-input";
import { CircularProgress } from "@material-ui/core";

const useStyles = makeStyles(({ spacing }) => ({
  form: {
    width: "100%",
    maxWidth: "300px",
    "& > *": {
      marginBottom: spacing()
    }
  },
  summary: {
    fontWeight: "300"
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
    localStorage.setItem("contacts", JSON.stringify(values));
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
          {t("common:checkout.total")}: {totalPrice} грн
        </Typography>
      </Box>
      <div className={classes.form}>
        <Field
          name="name"
          label={t("common:checkout.name")}
          component={TextField}
          fullWidth
        />
        <Field
          name="surname"
          label={t("common:checkout.surname")}
          component={TextField}
          fullWidth
        />
        <Field
          name="email"
          label={t("common:checkout.email")}
          component={TextField}
          fullWidth
        />
        <Field
          component={PhoneInput}
          fullWidth
          placeholder="+38(___)___-__-__"
          name="phone"
          type="text"
          label={t("common:checkout.phone")}
        />
        <CheckoutDelivery />
        {!!error && <Typography color="error">{error}</Typography>}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={3}
        >
          <Button color="primary" type="button" onClick={onBackClick}>
            {t("common:checkout.back")}
          </Button>
          {isSubmitting && <CircularProgress size={30} />}
          {!isSubmitting && (
            <CtaButton
              size="large"
              type="button"
              disabled={isSubmitting}
              onClick={onSubmit}
            >
              {t("common:checkout.order")}
            </CtaButton>
          )}
        </Box>
      </div>
    </>
  );
};

export default CheckoutForm;
