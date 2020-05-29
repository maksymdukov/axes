import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles(({ palette }) => ({
  mainHeader: {
    display: 'inline-block',
    position: 'relative',
    fontWeight: '300',
    '&:after': {
      content: '""',
      display: 'block',
      width: '50%',
      height: '2px',
      position: 'absolute',
      bottom: 0,
      left: '25%',
      backgroundColor: palette.secondary.light
    }
  }
}));

const MainHeader = ({
  children,
  disableMargin,
  className,
  align = 'center',
  component = 'h2',
  variant = 'h4'
}) => {
  const classes = useStyles();
  return (
    <Box marginBottom={disableMargin ? 0 : 3}>
      <Typography variant={variant} align={align} component={component}>
        <span className={clsx(classes.mainHeader, className)}>{children}</span>
      </Typography>
    </Box>
  );
};

export default MainHeader;
