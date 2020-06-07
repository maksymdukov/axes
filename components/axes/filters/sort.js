import React from 'react';
import { Box } from '@material-ui/core';
import SortFilter from '@Components/shared/filters/sort-filter';

const Sort = ({ onSortChange }) => {
  return (
    <Box display="flex" justifyContent="flex-end" mb={2}>
      <SortFilter onChange={onSortChange} />
    </Box>
  );
};

export default Sort;
