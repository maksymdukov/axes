import React from "react";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import TableContainer from "@material-ui/core/TableContainer";
import { useCart } from "../../../context/cart/hooks";
import CartQuantity from "../../shared/cart-quantity/cart-quantity";
import { useTranslation } from "next-translate";

const CartDialogTable = () => {
  const { t } = useTranslation();
  const { cart, deleteItem, addItem, decreaseItem } = useCart();
  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center">{t("common:cart.photo")}</TableCell>
            <TableCell align="center">{t("common:cart.name")}</TableCell>
            <TableCell align="center">{t("common:cart.totalItems")}</TableCell>
            <TableCell align="center">{t("common:cart.price")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cart.items.map(row => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                <IconButton size="small" onClick={() => deleteItem(row.id)}>
                  <DeleteIcon color="error" />
                </IconButton>
              </TableCell>

              <TableCell align="center">
                <img src={row.imageURL} alt="" width="auto" height={50} />
              </TableCell>
              <TableCell align="center">{row.title}</TableCell>
              <TableCell align="center">
                <CartQuantity
                  onIncrease={() => addItem(row)}
                  onDecrease={() => decreaseItem(row.id)}
                  decreaseDisabled={row.count === 1}
                >
                  {row.count}
                </CartQuantity>
              </TableCell>
              <TableCell align="center">{row.count * row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CartDialogTable;
