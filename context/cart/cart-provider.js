import React, { useEffect, useState } from "react";
import { CartContext } from "./cart-context";

const CartProvider = ({ children }) => {
  const [cart, setCartOriginal] = useState({
    items: [],
    totalCount: 0
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCartOriginal(JSON.parse(storedCart));
    }
  }, []);

  const setCart = crt => {
    if (crt.totalCount === 0) {
      localStorage.removeItem("cart");
    } else {
      localStorage.setItem("cart", JSON.stringify(crt));
    }
    setCartOriginal(crt);
  };

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
        : [...cart.items, { ...item, count: 1 }]
    });
  };

  const deleteItem = id => {
    const item = cart.items.find(itm => itm.id === id);
    setCart({
      ...cart,
      items: cart.items.filter(itm => itm.id !== id),
      totalCount: cart.totalCount - item.count
    });
  };

  const decreaseItem = id => {
    setCart({
      ...cart,
      items: cart.items.map(itm =>
        itm.id === id ? { ...itm, count: itm.count - 1 } : itm
      ),
      totalCount: cart.totalCount - 1
    });
  };

  const isInCart = id => {
    return cart.items.find(itm => itm.id === id);
  };
  return (
    <CartContext.Provider
      value={{ cart, addItem, deleteItem, decreaseItem, isInCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
