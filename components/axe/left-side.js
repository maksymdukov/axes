import React from "react";
import Typography from "@material-ui/core/Typography";
import Gallery from "./gallery/gallery";
import Box from "@material-ui/core/Box";
import CartQuantity from "../shared/cart-quantity/cart-quantity";
import Button from "@material-ui/core/Button";
import CtaButton from "../shared/buttons/cta-button";
import { useTranslation } from "next-translate";
import { useCart } from "../../context/cart/hooks";
import { useCartSnackbar } from "../../context/snackbar/snackbar-hooks";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  leftSection: {
    position: "sticky",
    top: 20
  }
}));

const LeftSide = ({ axe }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const {
    deleteItem,
    addItem,
    decreaseItem,
    isInCart,
    getItemCount
  } = useCart();
  const { showSnackbar } = useCartSnackbar();

  const inCart = isInCart(axe.id);
  const count = getItemCount(axe.id);

  const onAddToCart = () => {
    addItem(axe);
    showSnackbar();
  };
  return (
    <section className={classes.leftSection}>
      <Typography variant="h4" component="h1" gutterBottom>
        {axe.title}
      </Typography>
      <Gallery axe={axe} />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5">{axe.price} грн</Typography>
        {inCart && (
          <>
            <CartQuantity
              onIncrease={() => addItem(axe)}
              onDecrease={() => decreaseItem(axe.id)}
              decreaseDisabled={count === 1}
              display="inline-flex"
            >
              {count}
            </CartQuantity>
            <Button
              size="large"
              variant="contained"
              color="default"
              onClick={() => deleteItem(axe.id)}
            >
              {t("axe:unorder")}
            </Button>
          </>
        )}
        {!inCart && (
          <CtaButton align="end" size="large" onClick={onAddToCart}>
            {t("axe:order")}
          </CtaButton>
        )}
      </Box>
    </section>
  );
};

export default LeftSide;
