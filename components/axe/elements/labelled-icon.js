import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  deliveryIcon: {
    width: '1.5rem',
    height: '1.5rem',
    verticalAlign: 'middle'
  },
  deliveryLabel: {
    marginLeft: spacing()
  }
}));

const LabelledIcon = ({ src, alt, label }) => {
  const classes = useStyles();
  return (
    <Typography variant="body2" color="textSecondary" gutterBottom>
      <img src={src} alt={alt} className={classes.deliveryIcon} />
      <span className={classes.deliveryLabel}>{label}</span>
    </Typography>
  );
};

export default LabelledIcon;
