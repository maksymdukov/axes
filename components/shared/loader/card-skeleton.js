import React from 'react';
import { useCardStyles } from '../card/card';
import { Card, CardContent, makeStyles } from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';
import clsx from 'clsx';

const useStyles = makeStyles(({ spacing }) => ({
  title: {
    marginBottom: spacing(),
    borderRadius: 4
  },
  subTitle: {
    height: '0.87em',
    marginBottom: spacing(0.5),
    borderRadius: 4
  },
  actions: {
    height: '2.95rem'
  }
}));

const CardSkeleton = () => {
  const classes = useCardStyles();
  const skClasses = useStyles();
  return (
    <Card elevation={3} className={classes.root}>
      <Skeleton variant="rect" className={classes.imageRatioWrapper} />
      <CardContent className={classes.actionArea}>
        <Skeleton
          variant="rect"
          className={clsx(classes.title, skClasses.title)}
        />
        <Skeleton
          variant="rect"
          className={clsx(classes.title, skClasses.title)}
        />
        <Skeleton variant="rect" className={skClasses.subTitle} />
        <Skeleton variant="rect" width="80%" className={skClasses.subTitle} />
        <Skeleton variant="rect" width="50%" className={skClasses.subTitle} />
      </CardContent>
      <div>
        <Skeleton variant="rect" className={clsx(skClasses.actions)} />
      </div>
    </Card>
  );
};

export default CardSkeleton;
