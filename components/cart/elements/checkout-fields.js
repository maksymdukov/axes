import React from "react";
import { Field } from "formik";
import { TextField } from "formik-material-ui";
import PhoneInput from "../../shared/inputs/phone-input";
import CheckoutDelivery from "./checkout-delivery";

const CheckoutFields = ({ t, additionalFields }) => {
  return (
    <>
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
      {additionalFields}
    </>
  );
};

export default CheckoutFields;
