import React from 'react';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import {
  Dialog,
  DialogTitle,
  makeStyles,
  Box,
  IconButton,
  DialogContent
} from '@material-ui/core';
import { useTranslation } from 'next-translate';
import NewCommentForm from './new-comment-form';

const useStyles = makeStyles(({ palette, breakpoints }) => ({
  titleBg: {
    backgroundColor: palette.primary.light,
    color: palette.primary.contrastText
  },
  dialog: {
    [breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}));

const NewCommentDialog = ({ open, onClose, axe }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" scroll="body">
      <DialogTitle className={classes.titleBg}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <span>{t('axe:leaveComment')}</span>
          <IconButton color="inherit" onClick={onClose} size="small">
            <HighlightOffIcon />
          </IconButton>
        </Box>
      </DialogTitle>
      <DialogContent>
        <NewCommentForm slug={axe.slug} />
      </DialogContent>
    </Dialog>
  );
};

export default NewCommentDialog;
