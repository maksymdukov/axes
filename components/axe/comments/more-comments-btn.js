import React from 'react';
import { Button, Box } from '@material-ui/core';
import WithCenteredLoader from '@Components/shared/loader/with-centered-loader';

const MoreCommentsBtn = ({ total, size, page, onMoreClick, loading }) => {
  const isVisible = total > size && page * size < total;
  if (!isVisible) {
    return null;
  }
  return (
    <Box textAlign="center">
      <WithCenteredLoader loading={loading}>
        <Button variant="outlined" color="secondary" onClick={onMoreClick}>
          Загрузить ещё...
        </Button>
      </WithCenteredLoader>
    </Box>
  );
};

export default MoreCommentsBtn;
