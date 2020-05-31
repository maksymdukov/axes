import React from 'react';
import Link from '../../link/link';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  navLink: {
    fontSize: theme.typography.fontSize * 1.2,
    padding: theme.spacing(),
    color: 'inherit',
    transition: 'color .2s linear',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.secondary.light
    }
  },
  navLinkActive: {
    color: theme.palette.secondary.light
  }
}));

const NavmenuItem = ({ link, className }) => {
  const classes = useStyles();
  return (
    <Link
      key={link.to}
      href={link.to}
      className={clsx(classes.navLink, className)}
      activeClassName={classes.navLinkActive}
    >
      {link.label}
    </Link>
  );
};

export default NavmenuItem;
