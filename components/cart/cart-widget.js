import React, { useState } from "react";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import CartIcon from "@material-ui/icons/ShoppingBasket";
import CartDialog from "./cart-dialog";
import { makeStyles } from "@material-ui/core/styles";
import { useCart } from "../../context/cart/hooks";

const CartWidget = () => {
  const { cart } = useCart();
  const [isDialogOpened, setIsDialogOpened] = useState(false);
  const openDialog = () => {
    setIsDialogOpened(true);
  };
  const closeDialog = () => {
    setIsDialogOpened(false);
  };
  return (
    <div>
      <Badge color="secondary" badgeContent={cart.totalCount} overlap="circle">
        <IconButton color="inherit" onClick={openDialog}>
          <CartIcon />
        </IconButton>
      </Badge>
      <CartDialog isOpened={isDialogOpened} handleClose={closeDialog} />
    </div>
  );
};

export default CartWidget;
