import React from 'react';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  img: {
    width: 'auto',
    maxWidth: '90%',
    display: 'block',
    margin: '1rem auto'
  }
});

export const EmbeddedAsset = ({ src, alt }) => {
  const classes = useStyles();
  return <img className={classes.img} src={src} alt={alt} />;
};
