import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { default as NextLink } from 'next-translate/Link';
import { useCart } from '../../../context/cart/hooks';
import { getFirstImage } from '../../../utils/image';
import { useCartSnackbar } from '../../../context/snackbar/snackbar-hooks';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import clsx from 'clsx';

const useStyles = makeStyles(({ shadows, palette }) => ({
  root: {
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 345,
    margin: 'auto',
    overflow: 'hidden',
    '&:hover': {
      boxShadow: shadows[12],
      '& $priceTag': {
        color: palette.tertiary.dark,
        backgroundPosition: '-50% 0'
      },
      '& $toCart': {
        backgroundPosition: '0 0',
        color: palette.common.white
      }
    }
  },
  title: {
    fontWeight: 300,
    fontSize: '1.2rem'
  },
  priceTag: {
    fontWeight: 300,
    background: `linear-gradient(to right, ${palette.secondary.main} 50%, ${palette.common.white} 50% 100%)`,
    backgroundSize: '300% 200%',
    color: palette.common.white,
    padding: 5,
    transition: 'background-position .4s ease-out, color .4s ease-out'
  },
  imageRatioWrapper: {
    width: '100%',
    paddingBottom: 'calc(100% * 3 / 4)',
    position: 'relative'
  },
  media: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  toCart: {
    fontSize: '1rem',
    fontWeight: 400,
    flexGrow: 1,
    borderRadius: 0,
    color: palette.secondary.main,
    backgroundSize: '300% 200%',
    background: `linear-gradient(to right, ${palette.secondary.main} 50%, ${palette.common.white} 50% 100%)`,
    backgroundPosition: '75% 0',
    transition: 'background-position .4s ease-out, color .4s ease-out',
    border: 'none',
    '&:hover': {
      border: 'none'
    }
  },
  actionArea: {
    flexGrow: 1
  },
  actions: {
    display: 'flex'
  }
}));

export default function MediaCard({
  card,
  t,
  renderCustomActions,
  isDescription = true,
  titleVariant
}) {
  const classes = useStyles();
  const { cart, isInCart, addItem, deleteItem } = useCart();
  const { showSnackbar } = useCartSnackbar();

  const inCart = isInCart(card.id);

  const handleAddToCart = () => {
    addItem(card);
    if (!cart.items.length) {
      showSnackbar();
    }
  };
  const handleRemoveFromCart = () => deleteItem(card.id);
  return (
    <Card className={classes.root} elevation={3}>
      <NextLink href={`/axe/[axeId]`} as={`/axe/${card.slug}`} passHref>
        <CardActionArea className={classes.actionArea}>
          <div className={classes.imageRatioWrapper}>
            <CardMedia
              component="img"
              className={classes.media}
              src={`${getFirstImage(card.images)}?q=60&w=400`}
              alt={card.title}
            />
          </div>
          <CardContent>
            <Typography
              gutterBottom
              className={clsx(!titleVariant && classes.title)}
              variant={titleVariant}
              component="h2"
            >
              {card.title}
            </Typography>
            {isDescription && (
              <Typography variant="body2" color="textSecondary" component="p">
                {card.description}
              </Typography>
            )}
          </CardContent>
        </CardActionArea>
      </NextLink>
      <div className={classes.actions}>
        {renderCustomActions ? (
          renderCustomActions(card)
        ) : (
          <>
            <Typography variant="h6" className={classes.priceTag}>
              {card.price} грн
            </Typography>
            <Button
              disableElevation
              variant={inCart ? 'outlined' : 'contained'}
              className={classes.toCart}
              color="secondary"
              onClick={inCart ? handleRemoveFromCart : handleAddToCart}
            >
              {inCart ? (
                <>
                  <CheckCircleOutlineIcon /> {t('common:card.inCart')}
                </>
              ) : (
                t('common:card.toCart')
              )}
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
