// eslint-disable-next-line
import { Options } from '@contentful/rich-text-react-renderer';
import { BLOCKS, INLINES } from '@contentful/rich-text-types';
import { Typography } from '@material-ui/core';
import React from 'react';
import { getHeaderOptions } from './headers';
import { getMarkOptions } from './mark';
import { EmbeddedAsset } from './embedded-asset';
import { renderHyperlink } from './inlines';
import { renderParagraph } from './paragraph';

/**
 * @type {Options}
 */
export const richtextDocumentOptions = {
  renderMark: getMarkOptions(),
  renderNode: {
    ...getHeaderOptions(),
    [INLINES.HYPERLINK]: renderHyperlink,
    [BLOCKS.PARAGRAPH]: renderParagraph,
    [BLOCKS.EMBEDDED_ASSET]: (node) => (
      <EmbeddedAsset
        src={node.data.target.fields.file.url}
        alt={node.data.target.fields.title}
      />
    )
  }
};
