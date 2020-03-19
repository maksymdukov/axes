import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "next/link";
import CtaButton from "../buttons/cta-button";

const useStyles = makeStyles(({ customShadows, shadows }) => ({
  root: {
    width: "100%",
    height: "100%",
    display: "flex",
    flexDirection: "column",
    maxWidth: 345,
    margin: "auto",
    "&:hover": {
      boxShadow: shadows[12]
    }
  },
  media: {
    width: "100%",
    height: "auto",
    paddingBottom: "calc(100% * 9 / 16)"
    // backgroundSize: "contain"
  },
  actionArea: {
    flexGrow: 1
  },
  details: {
    marginRight: "auto"
  }
}));

export default function MediaCard({ card }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={3}>
      <Link href={`/axes/[axeId]`} as={`/axes/${card.id}`}>
        <CardActionArea className={classes.actionArea}>
          <CardMedia
            className={classes.media}
            image={card.imageURL}
            title="Axe"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {card.title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {card.description}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Link>
      <CardActions>
        <Link href={`/axes/[axeId]`} as={`/axes/${card.id}`}>
          <Button
            size="small"
            color="secondary"
            component="a"
            className={classes.details}
          >
            Детальнее
          </Button>
        </Link>
        <CtaButton size="small" color="inherit">
          Заказать
        </CtaButton>
      </CardActions>
    </Card>
  );
}
