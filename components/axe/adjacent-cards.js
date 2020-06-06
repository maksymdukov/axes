import React from 'react';
import { Grid } from '@material-ui/core';
import SimpleCard from '@Components/shared/card/simple-card';

const AdjacentCards = ({ adjacentAxes, t, className }) => {
  return (
    <Grid container className={className} spacing={3}>
      {adjacentAxes.map((axe, index) => (
        <Grid key={index} item xs={10} sm={4} md={2}>
          <SimpleCard card={axe} t={t} />
        </Grid>
      ))}
    </Grid>
  );
};

export default AdjacentCards;
