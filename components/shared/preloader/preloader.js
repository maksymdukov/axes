import React from 'react';
import PreloadAxeIcon from '../icons/preload-axe.svg';
import PreloadAxeFlippedIcon from '../icons/preload-axe2.svg';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  backdrop: {
    position: 'fixed',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 10000,
    backgroundColor: 'rgb(220, 220, 220)',
    color: '#fff',
    fontSize: '2rem',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  img: {
    marginTop: spacing(3)
  }
}));

const Preloader = React.forwardRef(({ languageChanged, sameLanguage }, ref) => {
  const classes = useStyles();
  return (
    <div
      ref={ref}
      className={classes.backdrop}
      style={{
        opacity: languageChanged ? 0 : 1,
        transition: sameLanguage ? 'opacity .8s' : 'opacity 1s'
      }}
    >
      <div id="box">
        <div id="icon1">
          <PreloadAxeIcon />
        </div>
        <div id="icon2">
          <PreloadAxeFlippedIcon />
        </div>
      </div>
      <img
        className={classes.img}
        src="/assets/images/sokyranetua2.png"
        alt="sokyranetua"
      />
    </div>
  );
});

export default Preloader;
