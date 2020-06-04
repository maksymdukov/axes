import React from 'react';
import {
  Card,
  makeStyles,
  Divider,
  CardContent,
  Typography,
  capitalize
} from '@material-ui/core';
import clsx from 'clsx';
import { format } from 'date-fns';
import { Rating } from '@material-ui/lab';

const useStyles = makeStyles(({ palette, spacing }) => ({
  card: {
    border: `1px solid ${palette.grey[400]}`,
    marginBottom: spacing(2)
  },
  padding: {
    padding: spacing(2)
  },
  divider: {
    backgroundColor: palette.grey[400]
  },
  date: {
    fontWeight: 300
  }
}));

const Comment = ({ comment, locale }) => {
  const classes = useStyles();
  return (
    <Card elevation={0} className={classes.card} component="article">
      <header className={clsx(classes.padding)}>
        <Typography variant="subtitle2">
          {capitalize(comment.author?.name)}
        </Typography>
        <Typography variant="body2" className={classes.date}>
          {format(new Date(comment.createdAt), 'd LLLL yyyy', { locale })}
        </Typography>
        {comment.rating && (
          <Rating name="read-only" value={comment.rating} readOnly />
        )}
      </header>
      <Divider className={classes.divider} />
      <CardContent>
        <Typography variant="body2">some text blablabalbalb</Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
