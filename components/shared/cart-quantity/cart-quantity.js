import React from "react";
import IconButton from "@material-ui/core/IconButton";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import { Box } from "@material-ui/core";

const CartQuantity = ({
  onIncrease,
  onDecrease,
  decreaseDisabled,
  children
}) => {
  return (
    <Box
      display="flex"
      flexWrap="nowrap"
      alignItems="center"
      justifyContent="center"
    >
      <IconButton disabled={decreaseDisabled} size="small" onClick={onDecrease}>
        <RemoveIcon />
      </IconButton>
      {children}
      <IconButton size="small" onClick={onIncrease}>
        <AddIcon />
      </IconButton>
    </Box>
  );
};

export default CartQuantity;
