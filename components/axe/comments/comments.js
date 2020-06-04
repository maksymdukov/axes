import React, { useState } from 'react';
import Comment from './comment';
import { uk, ru } from 'date-fns/locale';
import { Button, makeStyles } from '@material-ui/core';
import NewCommentDialog from './new-comment-dialog';

const useStyles = makeStyles(({ spacing }) => ({
  btn: {
    marginBottom: spacing(2)
  }
}));

const Comments = ({ comments, lang, t, axe }) => {
  const classes = useStyles();
  const [dialog, setDialog] = useState(false);
  const locale = lang === 'ru' ? ru : uk;

  const openDialog = () => setDialog(true);
  const closeDialog = () => setDialog(false);
  return (
    <div>
      <NewCommentDialog open={dialog} onClose={closeDialog} axe={axe} />
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        onClick={openDialog}
      >
        {t('axe:leaveComment')}
      </Button>
      {comments.items.map((comment) => (
        <Comment key={comment.id} comment={comment} locale={locale} />
      ))}
    </div>
  );
};

export default Comments;
