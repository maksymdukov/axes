import React, { useContext } from "react";
import { CartContext } from "./cart-context";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useContext({
    items: [],
    totalCount: 0
  });

  const addItem = item => {
    let updatedItem;
    const inCartIndex = cart.items.findIndex(
      cartItem => cartItem.id === item.id
    );
    if (inCartIndex > -1) {
      const oldItem = cart.items[inCartIndex];
      updatedItem = { ...oldItem, count: oldItem.count + 1 };
    }
    setCart({
      totalCount: cart.totalCount + 1,
      items: updatedItem
        ? cart.items.map(itm => (itm.id === updatedItem.id ? updatedItem : itm))
        : [...cart.items, item]
    });
  };
  return (
    <CartContext.Provider value={{ cart, addItem }}>
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
