import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles(({ spacing, palette }) => ({
  contact: {
    display: "flex",
    alignItems: "center",
    marginBottom: spacing(),
    color: palette.primary.dark,
    transition: "filter .2s linear",
    "&:hover": {
      filter: "brightness(2)"
    }
  },
  icon: {
    width: spacing(4),
    height: spacing(4),
    marginRight: spacing(2)
  }
}));

const Contact = ({ imgSrc, alt, value, ...rest }) => {
  const classes = useStyles();
  return (
    <a className={classes.contact} {...rest}>
      <img src={imgSrc} alt={alt} className={classes.icon} />
      <Typography component="span" variant="body2" color="textSecondary">{value}</Typography>
    </a>
  );
};

export default Contact;
