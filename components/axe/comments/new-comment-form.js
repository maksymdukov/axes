import React from 'react';
import NewCommentRating from './new-comment-rating';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import WithCenteredLoader from '@Components/shared/loader/with-centered-loader';
import { Button, Typography } from '@material-ui/core';

const NewCommentForm = ({
  setFieldValue,
  values,
  t,
  isSubmitting,
  error,
  handleSubmit
}) => {
  return (
    <>
      <NewCommentRating setFieldValue={setFieldValue} value={values.rating} />
      <Field
        name="name"
        label={t('axe:commentForm.name')}
        component={TextField}
        fullWidth
      />
      <Field
        name="message"
        label={t('axe:commentForm.message')}
        multiline
        rows={6}
        variant="outlined"
        component={TextField}
        fullWidth
      />
      <WithCenteredLoader loading={isSubmitting}>
        <Button
          variant="contained"
          color="secondary"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          {t('axe:commentForm.send')}
        </Button>
      </WithCenteredLoader>
      {error && (
        <Typography color="error" component="span">
          {error}
        </Typography>
      )}
    </>
  );
};

export default NewCommentForm;
