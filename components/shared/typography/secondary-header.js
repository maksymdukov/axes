import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  adjacentTitle: {
    marginBottom: spacing(2)
  }
}));

const SecondaryHeader = ({ children }) => {
  const classes = useStyles();
  return (
    <Typography variant="h5" component="h2" className={classes.adjacentTitle}>
      {children}
    </Typography>
  );
};

export default SecondaryHeader;
