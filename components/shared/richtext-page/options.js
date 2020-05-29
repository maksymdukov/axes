// eslint-disable-next-line
import { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS } from '@contentful/rich-text-types';
import { Typography } from '@material-ui/core';
import React from 'react';
import { getHeaderOptions } from './headers';
import { getMarkOptions } from './mark';
import { EmbeddedAsset } from './embedded-asset';

/**
 * @type {Options}
 */
export const richtextDocumentOptions = {
  renderMark: getMarkOptions(),
  renderNode: {
    ...getHeaderOptions(),
    [BLOCKS.PARAGRAPH]: (node, children) => <Typography>{children}</Typography>,
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <EmbeddedAsset
        src={node.data.target.fields.file.url}
        alt={node.data.target.fields.title}
      />
    )
  }
};
