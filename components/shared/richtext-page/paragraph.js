import React from 'react';
import { Typography, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  paragraph: {
    marginBottom: spacing(2)
  }
}));

export const renderParagraph = (node, children) => {
  const classes = useStyles();
  return <Typography className={classes.paragraph}>{children}</Typography>;
};
