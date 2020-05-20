import React from 'react';
import WaveSvg from '../shared/icons/wave.svg';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette }) => ({
  wave: {
    '& path': {
      fill: palette.tertiary.main
    }
  }
}));

export const Wave = () => {
  const classes = useStyles();
  return (
    <div style={{ height: 150, overflow: 'hidden' }}>
      <WaveSvg className={classes.wave} />
    </div>
  );
};
