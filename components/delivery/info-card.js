import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Paper } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '1rem',
    height: '100%'
  },
  icon: {
    width: '5rem',
    height: '5rem'
  },
  text: {
    alignSelf: 'stretch'
  },
  paragraph: {
    '&::first-letter': {
      fontWeight: 'bold'
    }
  }
}));

const InfoCard = ({ src, header, text, text2 }) => {
  const classes = useStyles();
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Paper elevation={4} className={classes.paper}>
        <img src={src} alt="icon" className={classes.icon} />
        <div className={classes.text}>
          <Typography variant="h5" align="center" gutterBottom>
            {header}
          </Typography>
          <Typography
            className={classes.paragraph}
            color="textSecondary"
            gutterBottom
          >
            {text}
          </Typography>
          <Typography
            className={classes.paragraph}
            color="textSecondary"
            gutterBottom
          >
            {text2}
          </Typography>
        </div>
      </Paper>
    </Grid>
  );
};

export default InfoCard;
