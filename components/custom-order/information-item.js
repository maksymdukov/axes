import React from 'react';
import CenteredBox from '../shared/box/centered-box';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(({ palette, shadows, spacing }) => ({
  container: {
    marginBottom: spacing(4)
  },
  iconWrapper: {
    borderRadius: '50%',
    padding: 30,
    height: 150,
    backgroundColor: palette.secondary.light,
    boxShadow: shadows[15],
    marginBottom: spacing(2)
  },
  icon: {
    fill: palette.common.white,
    width: 'auto',
    height: '100%'
  },
  description: {
    width: '80%',
    margin: 'auto',
    fontWeight: 300,
    textAlign: 'center'
  },
  fly: {
    animation: '$fly 0.7s linear forwards'
  },
  '@keyframes fly': {
    '0%': {
      transform: 'translateY(80px)',
      opacity: 0
    },
    '50%': {
      transform: 'translateY(30px)',
      opacity: 0.1
    },
    '100%': {
      transform: 'translateY(0px)',
      opacity: 1
    }
  }
}));

const InformationItem = ({ Icon, text }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={4} className={classes.container}>
      <CenteredBox flexDirection="column" className={classes.fly}>
        <div className={classes.iconWrapper}>
          <Icon className={classes.icon} />
        </div>
        <Typography variant="body2" className={classes.description}>
          {text}
        </Typography>
      </CenteredBox>
    </Grid>
  );
};

export default InformationItem;
