// import React from 'react';
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
// import installColorBlockPlugin from './colorblock';
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
      // atomic: (children, { data, keys }) => {
      //   console.log('atomic TOHTMLRender', data, keys);
      //   return data.map((item, i) => <div key={keys[i]} {...data[i]} />);
      // },
    },
    // entities: {
    //   ...config.settings.ToHTMLRenderers.entities,
    // },
  };

  // installColorBlockPlugin(config);
  installVideoPlugin(config);
  return config;
}
