import React from 'react';
import AxeIcon from '../../shared/icons/axe';
import Link from '~/components/shared/link/link';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Slogan from './slogan';

const useStyles = makeStyles((theme) => ({
  logoWrapper: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: 'inherit',
    transition: 'color .2s linear',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.secondary.light
    }
  },
  icon: {
    marginRight: theme.spacing()
  },
  title: {}
}));

const Logo = ({ className, slogan, onClick, size = 'large' }) => {
  const classes = useStyles();
  return (
    <Link
      href="/"
      className={clsx(classes.logoWrapper, className)}
      onClick={onClick}
    >
      <AxeIcon className={classes.icon} fontSize={size} />
      {slogan && <Slogan label={slogan} className={classes.title} />}
    </Link>
  );
};

export default Logo;
