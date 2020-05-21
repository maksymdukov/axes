import { CartContext } from './cart-context';
import { useContext } from 'react';

export const useCart = () => useContext(CartContext);
