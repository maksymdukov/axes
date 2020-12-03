import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import NavmenuItem from './elements/navmenu-item';
import useTranslation from 'next-translate/useTranslation';
import clsx from 'clsx';

const useStyles = makeStyles({
  linkWrapper: {
    display: 'flex'
  },
  inDrawer: {
    flexDirection: 'column'
  }
});

const Navmenu = ({
  inDrawer,
  onClick,
  getNavMenuItems,
  className,
  itemClassName
}) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <div
      className={clsx(
        classes.linkWrapper,
        inDrawer && classes.inDrawer,
        className
      )}
      onClick={onClick}
    >
      {getNavMenuItems(t).map((link) => (
        <NavmenuItem key={link.to} link={link} className={itemClassName} />
      ))}
    </div>
  );
};

export default Navmenu;
