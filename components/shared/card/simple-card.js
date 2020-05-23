import React from 'react';
import MediaCard from './card';
import { makeStyles, Typography } from '@material-ui/core';

const useStyles = makeStyles(({ palette, spacing }) => ({
  actions: {
    flexGrow: 1,
    padding: `0 ${spacing(2)}px`
  },
  priceTag: {
    color: palette.secondary.main
  }
}));

const SimpleCard = ({ card, t }) => {
  const classes = useStyles();
  const renderCustomActions = () => (
    <div className={classes.actions}>
      <Typography variant="h5" className={classes.priceTag}>
        {card.price} грн
      </Typography>
    </div>
  );

  return (
    <MediaCard
      card={card}
      isDescription={false}
      titleVariant="subtitle1"
      t={t}
      renderCustomActions={renderCustomActions}
    />
  );
};

export default SimpleCard;
