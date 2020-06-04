import React from 'react';
import { Formik } from 'formik';

const NewComment = ({ onSuccess, slug }) => {
  const initialValues = {
    name: '',
    message: '',
    rating: null,
    slug
  };
  return <Formik initialValues={initialValues}></Formik>;
};

export default NewComment;
