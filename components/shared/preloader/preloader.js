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
        src="data:image/png;base64,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"
        alt="sokyranetua"
      />
    </div>
  );
});

export default Preloader;
