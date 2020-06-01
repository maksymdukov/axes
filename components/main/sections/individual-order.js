import React from 'react';
import { Wave } from '../wave';
import Individual from '../individual';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette }) => ({
  contrastContainer: {
    paddingBottom: '4rem',
    background: palette.tertiary.main,
    color: 'white'
  }
}));

const IndividualOrder = () => {
  const classes = useStyles();
  return (
    <section>
      <Wave />
      <div className={classes.contrastContainer}>
        <Individual />
      </div>
    </section>
  );
};

export default IndividualOrder;
