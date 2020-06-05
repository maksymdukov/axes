import React from 'react';
import { Rating } from '@material-ui/lab';

const NewCommentRating = ({ setFieldValue, value }) => {
  return (
    <Rating
      name="rating"
      size="large"
      value={value || 0}
      onChange={(event, newValue) => setFieldValue('rating', newValue)}
    />
  );
};

export default NewCommentRating;
