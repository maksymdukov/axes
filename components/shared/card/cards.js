import React from "react";
import Grid from "@material-ui/core/Grid";
import MediaCard from "./card";
import { useTranslation } from "react-i18next";

const Cards = ({ cards, className }) => {
  const { t } = useTranslation("index");
  return (
    <Grid container spacing={2} className={className}>
      {cards.map((card, index) => (
        <Grid key={index} item sm={6} md={4} lg={3} xs={12}>
          <MediaCard card={card} t={t} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Cards;
