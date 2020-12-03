import React from 'react';
import { Link as MuiLink, makeStyles } from '@material-ui/core';
import { parseUrl, parseFullPath } from '~/utils/url';
import Link from '../link/link';
import useTranslation from 'next-translate/useTranslation';

const useStyles = makeStyles(({ palette }) => ({
  link: {
    color: palette.secondary.light
  }
}));

export const renderHyperlink = (node, children) => {
  const classes = useStyles();
  const { lang } = useTranslation();

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
  const { path: clearPath } = parseFullPath(url.pathname)();
  return (
    <Link href={clearPath} lang={lang} className={classes.link}>
      {children}
    </Link>
  );
};
