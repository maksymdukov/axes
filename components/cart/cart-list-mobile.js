import React from 'react';
import { useCart } from '~/context/cart/hooks';
import MobileListItem from './elements/mobile-list-item';

const CartListMobile = () => {
  const {
    cart,
    deleteItem,
    addItem,
    decreaseItem,
    closeCartWidget
  } = useCart();
  return (
    <div>
      {cart.items.map((cartItem) => (
        <MobileListItem
          key={cartItem.id}
          cartItem={cartItem}
          onIncrease={() => addItem(cartItem)}
          onDecrease={() => decreaseItem(cartItem.id)}
          onDelete={() => deleteItem(cartItem.id)}
          closeCartWidget={closeCartWidget}
        />
      ))}
    </div>
  );
};

export default CartListMobile;
