import React from 'react';
import Comment from './comment';
import { uk, ru } from 'date-fns/locale';
import { Button, makeStyles } from '@material-ui/core';

const useStyles = makeStyles(({ spacing }) => ({
  btn: {
    marginBottom: spacing(2)
  }
}));

const Comments = ({ comments, lang, t }) => {
  const classes = useStyles();
  const locale = lang === 'ru' ? ru : uk;
  return (
    <div>
      <Button className={classes.btn} variant="contained" color="primary">
        {t('axe:leaveComment')}
      </Button>
      {comments.items.map((comment) => (
        <Comment key={comment.id} comment={comment} locale={locale} />
      ))}
    </div>
  );
};

export default Comments;
