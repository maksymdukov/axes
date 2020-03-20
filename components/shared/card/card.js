import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Link from "~/components/shared/link/link";
import CtaButton from "../buttons/cta-button";
import { Link as NextLink } from "~/i18n";

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

export default function MediaCard({ card, t }) {
  const classes = useStyles();

  return (
    <Card className={classes.root} elevation={3}>
      <NextLink href={`/axes/page?axeId=${card.id}`} as={`/axes/${card.id}`}>
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
      </NextLink>
      <CardActions>
        <NextLink href={`/axes/page?axeId=${card.id}`} as={`/axes/${card.id}`}>
          <Button
            size="small"
            color="secondary"
            component="a"
            className={classes.details}
          >
            {t("details")}
          </Button>
        </NextLink>
        <CtaButton size="small" color="inherit">
          {t("order")}
        </CtaButton>
      </CardActions>
    </Card>
  );
}
