import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { default as NextLink } from "next-translate/Link";
import { useCart } from "../../../context/cart/hooks";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import { getFirstImage } from "../../../utils/image";
import { useCartSnackbar } from "../../../context/snackbar/snackbar-hooks";

const useStyles = makeStyles(({ shadows }) => ({
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
    paddingBottom: "calc(100% * 9 / 16)",
    backgroundSize: "contain"
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
  const { cart, isInCart, addItem, deleteItem } = useCart();
  const { showSnackbar } = useCartSnackbar();

  const inCart = isInCart(card.id);

  const handleAddToCart = () => {
    addItem(card);
    if (!cart.items.length) {
      showSnackbar();
    }
  };
  const handleRemoveFromCart = () => deleteItem(card.id);

  return (
    <Card className={classes.root} elevation={3}>
      <NextLink href={`/axe/[axeId]`} as={`/axe/${card.id}`} passHref>
        <CardActionArea className={classes.actionArea}>
          <CardMedia
            className={classes.media}
            image={getFirstImage(card.images)}
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
        <NextLink href={`/axe/[axeId]`} as={`/axe/${card.id}`} passHref>
          <Button
            size="small"
            color="default"
            variant="contained"
            component="a"
            className={classes.details}
          >
            {t("index:details")}
          </Button>
        </NextLink>
        <IconButton
          color="secondary"
          onClick={inCart ? handleRemoveFromCart : handleAddToCart}
        >
          {isInCart(card.id) ? <ShoppingCartIcon /> : <AddShoppingCartIcon />}
        </IconButton>
      </CardActions>
    </Card>
  );
}
