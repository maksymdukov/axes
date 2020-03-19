import React from "react";
import Grid from "@material-ui/core/Grid";
import MediaCard from "./card";
import clsx from "clsx";

const Cards = ({ cards, className }) => {
  return (
    <Grid container spacing={2} className={className}>
      {cards.map((card, index) => (
        <Grid key={index} item sm={6} md={4} xs={12}>
          <MediaCard card={card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
