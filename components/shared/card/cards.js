import React from 'react';
import Grid from '@material-ui/core/Grid';
import MediaCard from './card';
import { useTranslation } from 'next-translate';
import { makeStyles } from '@material-ui/core';
import clsx from 'clsx';

const useStyles = makeStyles({
  loading: {
    opacity: 0.6
  }
});

const Cards = ({ cards, className, loading }) => {
  const classes = useStyles();
  const { t } = useTranslation('index');
  return (
    <Grid
      container
      spacing={2}
      className={clsx(className, loading && classes.loading)}
    >
      {cards.map((card, index) => (
        <Grid key={index} item sm={6} md={4} lg={3} xs={12}>
          <MediaCard card={card} t={t} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
