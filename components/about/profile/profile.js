import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { useTranslation } from "react-i18next";
import Contact from "./contact";

const PHONE_NUMBER = "+380662906866";
const SKYPE = "latency0007";

const CONTACTS = [
  {
    alt: "Phone",
    imgSrc: "/assets/images/smartphone.svg",
    value: PHONE_NUMBER,
    href: `tel:${PHONE_NUMBER}`
  },
  {
    alt: "Viber",
    imgSrc: "/assets/images/viber.svg",
    value: PHONE_NUMBER,
    href: `viber://add?number=${PHONE_NUMBER}`
  },
  {
    alt: "Skype",
    imgSrc: "/assets/images/skype.svg",
    value: SKYPE,
    href: `skype:${SKYPE}?call`
  }
];

const useStyles = makeStyles(({ spacing }) => ({
  profile: {
    display: "inline-flex",
    flexDirection: "column",
    alignItems: "center"
  },
  photo: {
    width: spacing(15),
    height: spacing(15),
    marginBottom: spacing()
  },
  name: {
    marginBottom: spacing(3)
  }
}));

const Profile = () => {
  const { t } = useTranslation("about");
  const classes = useStyles();
  return (
    <div className={classes.profile}>
      <Avatar
        alt="Kolya"
        src="/assets/images/master.jpg"
        className={classes.photo}
      />
      <Typography
        align="center"
        variant="h6"
        className={classes.name}
        color="textPrimary"
      >
        {t("masterName")}
      </Typography>
      <div>
        {CONTACTS.map(contact => (
          <Contact key={contact.alt} {...contact} />
        ))}
      </div>
    </div>
  );
};

export default Profile;
