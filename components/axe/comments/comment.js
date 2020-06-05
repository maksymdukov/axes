import React, { useMemo } from 'react';
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
  },
  rating: {
    marginBottom: spacing(2)
  }
}));

const splitNewLines = (text) => text.split(/\r\n|\r|\n/g);

const Comment = ({ comment, locale }) => {
  const classes = useStyles();
  const message = useMemo(
    () =>
      splitNewLines(comment.message).map((line, idx) => (
        <React.Fragment key={idx}>
          {line} <br />
        </React.Fragment>
      )),
    [comment.message]
  );
  return (
    <Card elevation={0} className={classes.card} component="article">
      <header className={clsx(classes.padding)}>
        <Typography variant="subtitle2">
          {capitalize(comment.author?.name)}
        </Typography>
        <Typography variant="body2" className={classes.date}>
          {format(new Date(comment.createdAt), 'd MMMM yyyy', { locale })}
        </Typography>
      </header>
      <Divider className={classes.divider} />
      <CardContent>
        {comment.rating && (
          <Rating name="read-only" value={comment.rating} readOnly className={classes.rating} />
        )}
        <Typography variant="body2">{message}</Typography>
      </CardContent>
    </Card>
  );
};

export default Comment;
