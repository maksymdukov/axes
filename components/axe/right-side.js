import React from "react";
import Surface from "./surface/surface";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "next-translate";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(({ spacing }) => ({
  deliveryIcon: {
    width: "1.5rem",
    height: "1.5rem",
    verticalAlign: "middle"
  },
  deliveryLabel: {
    marginLeft: spacing()
  }
}));

const RightSide = ({ axe }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <>
      <Surface header={t("axe:descrHeader")}>
        <Typography>{axe.description}</Typography>
      </Surface>
      <Surface header={t("axe:specHeader")}>
        <p>Blab</p>
        <p>Blab</p>
        <p>Blab</p>
      </Surface>
      <Surface header={t("axe:deliveryHeader")}>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <img
            src="/assets/svg/nova-poshta.svg"
            alt="Nova poshta"
            className={classes.deliveryIcon}
          />
          <span className={classes.deliveryLabel}>{t("axe:novaPoshta")}</span>
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <img
            src="/assets/svg/ukr-poshta.svg"
            alt="Ukr poshta"
            className={classes.deliveryIcon}
          />
          <span className={classes.deliveryLabel}>{t("axe:ukrPoshta")}</span>
        </Typography>
      </Surface>
      <Surface header={t("axe:paymentMethodHeader")}>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <img
            src="/assets/svg/money.svg"
            alt="Money"
            className={classes.deliveryIcon}
          />
          <span className={classes.deliveryLabel}>{t("axe:platesh")}</span>
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          <img
            src="/assets/images/privatbank.png"
            alt="PrivatBank"
            className={classes.deliveryIcon}
          />
          <span className={classes.deliveryLabel}>{t("axe:privat")}</span>
        </Typography>
      </Surface>
    </>
  );
};

export default RightSide;
