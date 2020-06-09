import React from 'react';
import { Box, IconButton, Divider, makeStyles } from '@material-ui/core';
import CartQuantity from '@Components/shared/cart-quantity/cart-quantity';
import DeleteIcon from '@material-ui/icons/Delete';
import { getFirstImage } from '~/utils/image';
import Link from '@Components/shared/link/link';

const useStyles = makeStyles(({ spacing, palette, typography }) => ({
  divider: {
    marginBottom: spacing(2)
  },
  itemImage: {
    verticalAlign: 'middle',
    width: 50,
    marginRight: spacing(2)
  },
  link: {
    color: palette.secondary.main,
    fontSize: typography.fontSize * 1.2
  }
}));

const MobileListItem = ({
  cartItem,
  onIncrease,
  onDecrease,
  onDelete,
  closeCartWidget
}) => {
  const classes = useStyles();
  const firstImage = getFirstImage(cartItem.images);
  return (
    <>
      <Box display="flex" alignItems="center" mb={2}>
        <Link
          href={`/axe/[axeId]`}
          as={`/axe/${cartItem.slug}`}
          onClick={() => closeCartWidget()}
          className={classes.link}
        >
          <img
            className={classes.itemImage}
            src={firstImage.url}
            alt={firstImage.title}
          />
        </Link>
        <Box flexGrow="1">
          <Link
            href={`/axe/[axeId]`}
            as={`/axe/${cartItem.slug}`}
            onClick={() => closeCartWidget()}
            className={classes.link}
          >
            {cartItem.title}
          </Link>
        </Box>
      </Box>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        mb={2}
      >
        <Box>{cartItem.price} грн</Box>
        <Box>
          <CartQuantity
            onIncrease={onIncrease}
            onDecrease={onDecrease}
            decreaseDisabled={cartItem.count === 1}
          >
            {cartItem.count}
          </CartQuantity>
        </Box>
        <Box>
          <IconButton size="small" onClick={onDelete}>
            <DeleteIcon color="error" />
          </IconButton>
        </Box>
      </Box>
      <Divider className={classes.divider} />
    </>
  );
};

export default MobileListItem;
