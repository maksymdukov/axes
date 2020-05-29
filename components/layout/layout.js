import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Navbar from '../navbar/navbar';
import Footer from '../footer/footer';
import clsx from 'clsx';

const useStyles = makeStyles(({ palette }) => ({
  wrapper: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column'
  },
  main: {
    flexGrow: 1
    // paddingBottom: spacing(4)
  },
  footerWrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    backgroundColor: palette.primary.light,
    color: palette.primary.contrastText,
    minHeight: 200
  },
  footer: {
    flexGrow: 1
  },
  copyright: {
    backgroundColor: palette.primary.main
  }
}));

const Layout = ({ children, mainClassName, notFoundPage }) => {
  const classes = useStyles();
  return (
    <div className={classes.wrapper}>
      <Navbar />
      <main className={clsx(classes.main, mainClassName)}>{children}</main>
      <Footer notFoundPage={notFoundPage} />
    </div>
  );
};

export default Layout;
