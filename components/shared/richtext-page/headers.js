import React from 'react';
import { Typography } from '@material-ui/core';
import { BLOCKS } from '@contentful/rich-text-types';

export const getHeaderOptions = () => {
  let renderNodeObject = {};
  Array.from({ length: 6 }, (_, i) => {
    const idx = i + 1;
    renderNodeObject[BLOCKS[`HEADING_${idx}`]] = (node, children) => (
      <Typography variant={`h${idx}`} component={`h${idx}`}>
        {children}
      </Typography>
    );
  });
  return renderNodeObject;
};
