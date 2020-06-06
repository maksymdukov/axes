import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(({ spacing }) => ({
  spacing: {
    padding: spacing(2)
  },
  mb: {
    marginBottom: spacing(2)
  }
}));

const Surface = ({ children, header, disableMargin }) => {
  const classes = useStyles();
  return (
    <Paper
      variant="outlined"
      className={clsx(classes.spacing, !disableMargin && classes.mb)}
      component="section"
    >
      <Typography variant="h5" component="h2" color="secondary" gutterBottom>
        {header}
      </Typography>
      {children}
    </Paper>
  );
};

export default Surface;
