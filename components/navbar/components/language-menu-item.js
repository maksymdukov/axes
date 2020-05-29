import React from 'react';
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

const LanguageMenuItem = React.forwardRef(({ icon: Icon }, ref) => {
  const classes = useStyles();
  return (
    <div className={classes.item} ref={ref}>
      <Icon className={classes.icon} />
    </div>
  );
});

export default LanguageMenuItem;
