import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    borderRadius: '50%',
    color: palette.tertiary.dark,
    // border: "1px solid white",
    marginRight: 10,
    width: 40,
    height: 40,
    textAlign: 'center',
    verticalAlign: 'middle',
    boxShadow: `1px 2px 7px 5px ${palette.tertiary.dark}`,
    background: 'white'
  },
  number: {
    fontSize: '1.5rem',
    fontWeight: '600',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  }
}));

const NumberIcon = ({ number = 1 }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <span className={classes.number}>{number}</span>
    </div>
  );
};

export default NumberIcon;
