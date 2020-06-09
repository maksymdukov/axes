import React, { useMemo, useState } from 'react';
import { Formik, Form } from 'formik';
import { getSchema } from './new-comment-validation';
import { useTranslation } from 'next-translate';
import { makeStyles, Typography } from '@material-ui/core';
import { postComment } from '~/api/shared/get-comments';
import NewCommentFields from './new-comment-fields';

const useStyles = makeStyles(({ spacing, palette }) => ({
  form: {
    '& > div': {
      marginBottom: spacing(2)
    }
  },
  success: {
    color: palette.success.main,
    fontWeight: 300,
    padding: '2rem 1rem'
  }
}));

const NewCommentForm = ({ onSuccess, slug }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const initialValues = {
    name: '',
    email: '',
    message: '',
    rating: null,
    slug
  };
  const schema = useMemo(() => getSchema(t), []);
  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setError(null);
      setSuccess(false);
      // no need to send rating if it's not set
      if (values.rating === null) {
        delete values.rating;
      }
      await postComment({ values });
      setSuccess(true);
      onSuccess && onSuccess();
    } catch (error) {
      setError(t('axe:commentForm.error'));
      console.error(error);
    }
    setSubmitting(false);
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      {({ isSubmitting, handleSubmit, setFieldValue, values }) => (
        <Form className={classes.form}>
          {!success && (
            <NewCommentFields
              error={error}
              handleSubmit={handleSubmit}
              isSubmitting={isSubmitting}
              setFieldValue={setFieldValue}
              t={t}
              values={values}
            />
          )}
          {success && (
            <Typography variant="h6" className={classes.success}>
              {t('axe:commentForm.success')}
            </Typography>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default NewCommentForm;
