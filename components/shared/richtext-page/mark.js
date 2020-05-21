import React from 'react';
import { Box } from '@material-ui/core';
import { MARKS } from '@contentful/rich-text-types';

const Mark = ({ children, type }) => {
  let boxProps;
  switch (type) {
    case 'bold':
      boxProps = { fontWeight: 'bold' };
      break;
    case 'italic':
      boxProps = { component: 'i', fontStyle: 'italic' };
      break;
    case 'underline':
      boxProps = { textDecoration: 'underline' };
      break;
    default:
      boxProps = {};
      break;
  }
  return (
    <Box component="span" {...boxProps}>
      {children}
    </Box>
  );
};

export const getMarkOptions = () => ({
  [MARKS.BOLD]: (text) => <Mark type="bold">{text}</Mark>,
  [MARKS.UNDERLINE]: (text) => <Mark type="underline">{text}</Mark>,
  [MARKS.ITALIC]: (text) => <Mark type="italic">{text}</Mark>
});
