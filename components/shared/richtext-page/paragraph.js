import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  paragraph: {
    marginBottom: spacing(2),
    fontWeight: 300
  }
}));

export const renderParagraph = (node, children) => {
  const classes = useStyles();
  return (
    <Typography className={classes.paragraph} variant="body1">
      {children}
    </Typography>
  );
};
