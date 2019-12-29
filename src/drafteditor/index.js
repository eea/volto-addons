import React from 'react';
import { CodeBlockButton } from 'draft-js-buttons';
import {
  Strikethrough,
  HeaderOne,
  HeaderTwo,
  HeaderThree,
  AlignLeft,
  AlignCenter,
  AlignRight,
  inlineRenderers,
  styleMap,
  customBlockStyleFn,
  HeaderFour,
} from 'volto-addons/drafteditor/styleConfig';

import installColorBlockPlugin from './colorblock';
import installVideoPlugin from './video';

export default function applyConfig(config) {
  config.settings.blockStyleFn = customBlockStyleFn;

  config.settings.customStyleMap = styleMap;

  config.settings.richTextEditorInlineToolbarButtons = [
    Strikethrough,
    CodeBlockButton,
    AlignLeft,
    AlignCenter,
    AlignRight,
    HeaderOne,
    HeaderTwo,
    HeaderThree,
    HeaderFour,
    ...config.settings.richTextEditorInlineToolbarButtons,
    // TODO: this is not good practice, should find a better way to test
    // buttons to remove
  ]; // .filter((button, index) => index !== 13 && index !== 14);

  config.settings.ToHTMLRenderers = {
    ...config.settings.ToHTMLRenderers,
    inline: {
      ...config.settings.ToHTMLRenderers.inline,
      ...inlineRenderers,
    },
    blocks: {
      ...config.settings.ToHTMLRenderers.blocks,
      // this function needs attention
      atomic: (children, { data, keys }) => {
        return <div className="atomic-block">{children}</div>;
      },
    },
  };

  installColorBlockPlugin(config);
  installVideoPlugin(config);

  return config;
}
