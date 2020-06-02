import React from 'react';
import { Link as MuiLink, makeStyles } from '@material-ui/core';
import { parseUrl, parseFullPath } from '~/utils/url';
import Link from '../link/link';

const useStyles = makeStyles(({ palette }) => ({
  link: {
    color: palette.secondary.light
  }
}));

export const renderHyperlink = (node, children) => {
  const classes = useStyles();

  // parse string to use next-translate link if it has the same origin
  const url = parseUrl(node.data.uri);
  // not the same origin
  if (!url.isSameOrigin) {
    return (
      <MuiLink href={node.data.uri} className={classes.link}>
        {children}
      </MuiLink>
    );
  }
  const { lang, path } = parseFullPath(url.pathname)();
  return (
    <Link href={path} lang={lang} className={classes.link}>
      {children}
    </Link>
  );
};
