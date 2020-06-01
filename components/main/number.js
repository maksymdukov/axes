import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    display: 'inline-block',
    position: 'relative',
    borderRadius: '50%',
    color: palette.tertiary.dark,
    marginRight: 10,
    width: 40,
    height: 40,
    textAlign: 'center',
    verticalAlign: 'middle',
    boxShadow: `1px 2px 7px 5px ${palette.tertiary.dark}`,
    background: palette.common.white
  },
  number: {
    fontSize: '1.5rem',
    fontWeight: '600',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  },
  animateFlash: {
    animation: '1s ease-in $flash forwards'
  },
  animationDelay: {
    animationDelay: (props) => `${props.delay}s`
  },
  '@keyframes flash': {
    '0%': {
      background: palette.common.white
    },
    '50%': {
      background: palette.secondary.light
    },
    '100%': {
      background: palette.common.white
    }
  }
}));

const NumberIcon = ({ number = 1, animate = false, delay = 0 }) => {
  const classes = useStyles({ delay });
  return (
    <div
      className={clsx(
        classes.wrapper,
        animate && classes.animateFlash,
        animate && classes.animationDelay
      )}
    >
      <span className={classes.number}>{number}</span>
    </div>
  );
};

export default NumberIcon;
