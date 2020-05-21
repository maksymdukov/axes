import React from 'react';
import FlagRUIcon from '../../shared/icons/flag-ru';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  item: {
    display: 'flex',
    alignItems: 'center'
  },
  icon: {
    marginRight: 5
  }
});

const LanguageMenuItem = React.forwardRef(
  ({ lang, icon: Icon, label }, ref) => {
    const classes = useStyles();
    return (
      <div className={classes.item}>
        <Icon className={classes.icon} />
      </div>
    );
  }
);

export default LanguageMenuItem;
