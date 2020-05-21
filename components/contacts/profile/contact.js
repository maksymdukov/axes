import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(({ spacing }) => ({
  contact: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: spacing(),
    color: 'inherit',
    '&:hover img': {
      filter: 'brightness(2)'
    }
  },
  icon: {
    width: spacing(4),
    height: spacing(4),
    marginRight: spacing(2),
    transition: 'filter .2s linear'
  }
}));

const Contact = ({ imgSrc, alt, value, ...rest }) => {
  const classes = useStyles();
  return (
    <a className={classes.contact} {...rest}>
      <img src={imgSrc} alt={alt} className={classes.icon} />
      <Typography component="span" variant="inherit" color="inherit">
        {value}
      </Typography>
    </a>
  );
};

export default Contact;
