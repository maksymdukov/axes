import React, { useContext } from "react";
import { SnackbarContext } from "./snackbar-context";
import { useCart } from "../cart/hooks";
import { useTranslation } from "next-translate";
import IconButton from "@material-ui/core/IconButton";
import CartIcon from "@material-ui/icons/ShoppingBasket";
import Box from "@material-ui/core/Box";

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};

export const useCartSnackbar = () => {
  const { openCartWidget } = useCart();
  const { open } = useSnackbar();
  const { t } = useTranslation();

  const showSnackbar = () =>
    open({
      message: close => (
        <>
          <Box display="inline-block" mr={2}>
            <IconButton
              size="small"
              color="inherit"
              onClick={() => {
                openCartWidget();
                close();
              }}
            >
              <CartIcon />
            </IconButton>
          </Box>
          {t("common:cart.itemAdded")}
        </>
      )
    });

  return { showSnackbar };
};
