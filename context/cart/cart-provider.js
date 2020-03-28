import React, { useEffect, useState } from "react";
import { CartContext } from "./cart-context";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({
    items: [],
    totalCount: 0,
    cartWidgetOpened: false
  });

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

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
      ...cart,
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
    setCart(prevState => ({
      ...prevState,
      items: cart.items.map(itm =>
        itm.id === id ? { ...itm, count: itm.count - 1 } : itm
      ),
      totalCount: cart.totalCount - 1
    }));
  };

  const isInCart = id => {
    return cart.items.find(itm => itm.id === id);
  };

  const getItemCount = id => {
    const found = isInCart(id);
    return found && found.count;
  };

  const clearCart = () => {
    setCart({ ...cart, items: [], totalCount: 0 });
  };

  const openCartWidget = () =>
    setCart(prevState => ({ ...prevState, cartWidgetOpened: true }));
  const closeCartWidget = () =>
    setCart(prevState => ({ ...prevState, cartWidgetOpened: false }));
  return (
    <CartContext.Provider
      value={{
        cart,
        addItem,
        deleteItem,
        decreaseItem,
        isInCart,
        getItemCount,
        openCartWidget,
        closeCartWidget,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
