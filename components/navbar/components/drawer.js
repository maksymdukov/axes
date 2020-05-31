import React from 'react';
import { Drawer as MuiDrawer } from '@material-ui/core';
import Navmenu from '../../shared/navmenu/navmenu';
import Logo from './logo';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import {
  getMainLinks,
  getSecondaryLinks
} from '@Components/shared/navmenu/nav-links';

const useStyles = makeStyles(({ spacing, palette, typography }) => ({
  logo: {
    alignSelf: 'center',
    padding: spacing(5),
    fontSize: '5rem'
  },
  secondaryLinks: {
    color: palette.primary.light
  },
  secondaryLinkItems: {
    fontSize: typography.fontSize
  },
  primaryDivider: {
    backgroundColor: palette.secondary.main
  },
  secondaryDivider: {
    width: 60,
    marginLeft: 'auto',
    marginRight: 'auto'
  }
}));

const Drawer = ({ isOpened, toggleDrawer }) => {
  const classes = useStyles();
  return (
    <MuiDrawer anchor="left" open={isOpened} onClose={toggleDrawer}>
      <Logo className={classes.logo} onClick={toggleDrawer} size="inherit" />
      <Divider className={classes.primaryDivider} />
      <Navmenu inDrawer onClick={toggleDrawer} getNavMenuItems={getMainLinks} />
      <Divider className={classes.secondaryDivider} />
      <Navmenu
        inDrawer
        onClick={toggleDrawer}
        getNavMenuItems={getSecondaryLinks}
        className={classes.secondaryLinks}
        itemClassName={classes.secondaryLinkItems}
      />
    </MuiDrawer>
  );
};

export default Drawer;
