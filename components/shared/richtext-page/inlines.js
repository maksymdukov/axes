import React from 'react';
import { Link, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ palette }) => ({
  link: {
    color: palette.secondary.light
  }
}));

export const renderHyperlink = (node, children) => {
  const classes = useStyles();
  // TODO - parse string to use next-translate link if it's local to origin
  // const url = new URL(node.data.uri);
  // url.pathname
  return (
    <Link href={node.data.uri} className={classes.link}>
      {children}
    </Link>
  );
};
