import React from "react";
import { Box, Dialog, DialogContent, DialogTitle } from "@material-ui/core";
import { useTranslation } from "next-translate";
import CartDialogTable from "./cart-dialog-table";
import { useCart } from "../../../context/cart/hooks";
import Typography from "@material-ui/core/Typography";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import CtaButton from "../../shared/buttons/cta-button";
import IconButton from "@material-ui/core/IconButton";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import CenteredBox from "../../shared/box/centered-box";

const CartDialog = ({ isOpened, handleClose }) => {
  const { t } = useTranslation();
  const { cart } = useCart();
  return (
    <Dialog
      open={isOpened}
      onClose={handleClose}
      fullWidth
      maxWidth="md"
      scroll="body"
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <span>{t("common:cart.title")}</span>
          <IconButton onClick={handleClose}>
            <HighlightOffIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        {!!cart.totalCount && (
          <>
            <CartDialogTable />
            <Box mt={2}>
              <Typography variant="h5">
                {t("common:cart.total")}: {cart.totalPrice}
              </Typography>
            </Box>
            <Box mt={2} textAlign="end">
              <CtaButton size="large">{t("common:cart.order")}</CtaButton>
            </Box>
          </>
        )}
        {!cart.totalCount && (
          <Box mb={3}>
            <Typography variant="h5" align="center" color="textSecondary">
              <CenteredBox>
                <ShoppingCartIcon fontSize="large" /> {t("common:cart.empty")}
              </CenteredBox>
            </Typography>
          </Box>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartDialog;
