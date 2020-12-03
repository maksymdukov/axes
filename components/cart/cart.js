import React from 'react';
import { Box, Hidden } from '@material-ui/core';
import useTranslation from 'next-translate/useTranslation';
import CartListDesktop from './cart-list-desktop';
import { useCart } from '../../context/cart/hooks';
import Typography from '@material-ui/core/Typography';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import CtaButton from '../shared/buttons/cta-button';
import CenteredBox from '../shared/box/centered-box';
import CartListMobile from './cart-list-mobile';

const Cart = ({ onNextClick, totalPrice }) => {
  const { t } = useTranslation();
  const { cart } = useCart();
  return (
    <div>
      {!!cart.totalCount && (
        <>
          <Hidden implementation="css" xsDown>
            <CartListDesktop />
          </Hidden>
          <Hidden implementation="css" smUp>
            <CartListMobile />
          </Hidden>
          <Box mt={2}>
            <Typography variant="h5">
              {t('common:cart.total')}: {totalPrice} грн
            </Typography>
          </Box>
          <Box mt={2} textAlign="end">
            <CtaButton variant="outlined" onClick={onNextClick}>
              {t('common:cart.order')}
            </CtaButton>
          </Box>
        </>
      )}
      {!cart.totalCount && (
        <CenteredBox minWidth={300} minHeight={200}>
          <Typography variant="h5" align="center" color="textSecondary">
            <CenteredBox>
              <ShoppingCartIcon fontSize="large" /> {t('common:cart.empty')}
            </CenteredBox>
          </Typography>
        </CenteredBox>
      )}
    </div>
  );
};

export default Cart;
