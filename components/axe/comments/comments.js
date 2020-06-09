import React, { useState } from 'react';
import Comment from './comment';
import { uk, ru } from 'date-fns/locale';
import { Button, makeStyles, Typography } from '@material-ui/core';
import NewCommentDialog from './new-comment-dialog';
import MoreCommentsBtn from './more-comments-btn';
import { getCommentsBySlug } from '~/actions/comments';

const useStyles = makeStyles(({ spacing, palette }) => ({
  btn: {
    marginBottom: spacing(2)
  },
  noComments: {
    fontSize: '1.2rem',
    marginLeft: spacing(),
    marginBottom: spacing(),
    color: palette.grey[400]
  }
}));

const Comments = ({ comments, lang, t, axe }) => {
  const [lazyComments, setLazyComments] = useState(comments);
  const [status, setStatus] = useState({ loading: false, error: null });
  const { page, size, total, items } = lazyComments;

  const onMoreCommentsClick = async () => {
    setStatus((prevState) => ({ ...prevState, loading: true }));
    try {
      const moreComments = await getCommentsBySlug({
        slug: axe.slug,
        page: page + 1
      });
      setLazyComments({
        page: page + 1,
        size,
        total,
        items: items.concat(moreComments.items)
      });
      setStatus((prevState) => ({ ...prevState, loading: false }));
    } catch (error) {
      console.error(error);
      setStatus((prevState) => ({
        ...prevState,
        loading: false,
        error: 'Error'
      }));
    }
  };

  const classes = useStyles();
  const [dialog, setDialog] = useState(false);
  const locale = lang === 'ru' ? ru : uk;
  const openDialog = () => setDialog(true);
  const closeDialog = () => setDialog(false);
  // TODO add schema for ratings like in Rozetka
  return (
    <div>
      <NewCommentDialog open={dialog} onClose={closeDialog} axe={axe} />
      {!items.length && (
        <Typography className={classes.noComments}>
          {t('axe:noComments')}
        </Typography>
      )}
      <Button
        className={classes.btn}
        variant="contained"
        color="primary"
        onClick={openDialog}
      >
        {t('axe:leaveComment')}
      </Button>
      {items.map((comment) => (
        <Comment key={comment.id} comment={comment} locale={locale} />
      ))}
      <MoreCommentsBtn
        loading={status.loading}
        page={page}
        size={size}
        total={total}
        onMoreClick={onMoreCommentsClick}
      >
        {t('axe:moreCommentsBtn')}
      </MoreCommentsBtn>
    </div>
  );
};

export default Comments;
