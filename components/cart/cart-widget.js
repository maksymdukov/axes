import React from "react";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import CartIcon from "@material-ui/icons/ShoppingBasket";
import CartDialog from "./cart-dialog";
import { useCart } from "../../context/cart/hooks";

const CartWidget = () => {
  const { cart, openCartWidget, closeCartWidget } = useCart();
  return (
    <div>
      <Badge color="secondary" badgeContent={cart.totalCount} overlap="circle">
        <IconButton color="inherit" onClick={openCartWidget}>
          <CartIcon />
        </IconButton>
      </Badge>
      <CartDialog
        isOpened={cart.cartWidgetOpened}
        handleClose={closeCartWidget}
      />
    </div>
  );
};

export default CartWidget;
