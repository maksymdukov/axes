import React from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(() => ({
  page: {
    // paddingTop: spacing(4)
  }
}));

const PageLayout = ({ children, className, ...rest }) => {
  const classes = useStyles();
  return (
    <Container className={clsx(classes.page, className)} {...rest}>
      {children}
    </Container>
  );
};

export default PageLayout;
