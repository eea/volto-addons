import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
import createLinkPlugin from '@plone/volto/components/manage/AnchorPlugin';
import { Separator } from 'draft-js-inline-toolbar-plugin';
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
  // customBlockStyleFn,
  HeaderFour,
} from './styleConfig';
import {
  BlockquoteButton,
  BoldButton,
  CalloutButton,
  ItalicButton,
  // HeadlineTwoButton,
  // HeadlineThreeButton,
  OrderedListButton,
  UnorderedListButton,
} from '@plone/volto/config/RichTextEditor/Styles';

import installColorBlockPlugin from './colorblock';
import installVideoPlugin from './video';
import installStyleDropdownPlugin from './styleselect';

const breakOutOptions = {
  doubleBreakoutBlocks: [
    'unordered-list-item',
    'ordered-list-item',
    'code-block',
  ],
  breakoutBlocks: [
    'header-one',
    'header-two',
    'header-three',
    'highlight',
    'blockquote',
    'callout',
  ],
};

const blockBreakoutPlugin = createBlockBreakoutPlugin(breakOutOptions);
const linkPlugin = createLinkPlugin();

export default function applyConfig(config) {
  // draftjs editor accepted paramters:
  //
  // blockRenderMap: Optionally set a function to define custom block rendering.
  //
  // blockRendererFn: Provide a map of block rendering configurations. Each
  // block type maps to element tag and an optional react element wrapper. This
  // configuration is used for both rendering and paste processing.
  //
  // blockStyleFn: Optionally set a function to define class names to apply to
  // the given block when it is rendered.
  //
  // customStyleFn: Optionally define a map of inline styles to apply to spans
  // of text with the specified style.
  //
  // customStyleMap: Optionally define a function to transform inline styles to
  // CSS objects that are applied to spans of text.
  //

  config.settings.blockStyleMap = {
    ...config.settings.blockStyleMap,
    center: 'align-center',
    left: 'align-left',
    right: 'align-right',
    callout: 'callout',
  };

  config.settings.blockStyleFn = contentBlock => {
    const type = contentBlock.getType();

    return config.settings.blockStyleMap[type] || null;
  };

  config.settings.customStyleMap = styleMap;

  // TODO: we need a better way to make this extensible
  config.settings.richTextEditorInlineToolbarButtons = [
    BoldButton,
    ItalicButton,
    Strikethrough,
    linkPlugin.LinkButton,

    Separator,

    HeaderOne, // this header style should probably not be available
    HeaderTwo,
    HeaderThree,
    HeaderFour,
    // HeadlineTwoButton,
    // HeadlineThreeButton,

    Separator,

    AlignLeft,
    AlignCenter,
    AlignRight,

    Separator,

    UnorderedListButton,
    OrderedListButton,

    Separator,

    BlockquoteButton,
    CalloutButton,
    CodeBlockButton,

    Separator,

    // ...config.settings.richTextEditorInlineToolbarButtons,
    // TODO: this is not good practice, should find a better way to test
    // buttons to remove
  ]; // .filter((button, index) => index !== 13 && index !== 14);

  config.settings.richTextEditorPlugins = [linkPlugin, blockBreakoutPlugin];

  config.settings.ToHTMLRenderers = {
    ...config.settings.ToHTMLRenderers,
    inline: {
      ...config.settings.ToHTMLRenderers.inline,
      ...inlineRenderers,
    },
    blocks: {
      ...config.settings.ToHTMLRenderers.blocks,
      // this function needs attention. See
      // https://github.com/plone/volto/issues/1084
      atomic: (children, { data, keys }) => {
        return <div className="atomic-block">{children}</div>;
      },
    },
  };

  installColorBlockPlugin(config);
  installVideoPlugin(config);
  installStyleDropdownPlugin(config);

  return config;
}
