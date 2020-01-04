import React from 'react';
import Icon from '@plone/volto/components/theme/Icon/Icon';

import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';
import createBlockStyleButton from 'draft-js-buttons/lib/utils/createBlockStyleButton';

import { Separator } from 'draft-js-inline-toolbar-plugin';
// import { CodeBlockButton } from 'draft-js-buttons';

import {
  BlockquoteButton,
  BoldButton,
  CalloutButton,
  ItalicButton,
  OrderedListButton,
  UnorderedListButton,
  // HeadlineTwoButton,
  // HeadlineThreeButton,
} from '@plone/volto/config/RichTextEditor/Styles';

import strickthroughSVG from '@plone/volto/icons/strickthrough.svg';
import alignLeftSVG from '@plone/volto/icons/align-left.svg';
import alignRightSVG from '@plone/volto/icons/align-right.svg';
import alignCenterSVG from '@plone/volto/icons/align-center.svg';
import underlineSVG from '@plone/volto/icons/underline.svg';

import plugins from '@plone/volto/config/RichTextEditor/Plugins';

// import underlineSVG from '@plone/volto/icons/underline.svg';

export const Strikethrough = createInlineStyleButton({
  style: 'STRIKETHROUGH',
  children: <Icon name={strickthroughSVG} size="24px" />,
});

export const Underline = createInlineStyleButton({
  style: 'UNDERLINE',
  children: <Icon name={underlineSVG} size="24px" />,
});

export const HeaderOne = createBlockStyleButton({
  blockType: 'header-one',
  children: <p>H1</p>,
});

export const HeaderTwo = createBlockStyleButton({
  blockType: 'header-two',
  children: <p>H2</p>,
});

export const HeaderThree = createBlockStyleButton({
  blockType: 'header-three',
  children: <p>H3</p>,
});

export const HeaderFour = createBlockStyleButton({
  blockType: 'header-four',
  children: <p>H4</p>,
});

export const AlignLeft = createInlineStyleButton({
  style: 'AlignBlockLeft',
  children: <Icon name={alignLeftSVG} size="24px" />,
});

export const AlignCenter = createInlineStyleButton({
  style: 'AlignBlockCenter',
  children: <Icon name={alignCenterSVG} size="24px" />,
});

export const AlignRight = createInlineStyleButton({
  style: 'AlignBlockRight',
  children: <Icon name={alignRightSVG} size="24px" />,
});

// export const extendedBlockRenderMap = Draft.DefaultDraftBlockRenderMap.merge(
//   alignBlockRenderMap,
//   config.settings.extendedBlockRenderMap,
// );

export const styleMap = {
  STRIKETHROUGH: {
    textDecoration: 'line-through',
  },
  AlignBlockCenter: {
    textAlign: 'center',
    display: 'block',
  },
  AlignBlockLeft: {
    textAlign: 'left',
    display: 'block',
  },
  AlignBlockRight: {
    textAlign: 'right',
    display: 'block',
  },
};

export const inlineRenderers = {
  AlignBlockCenter: (children, { key }) => (
    <div className="align-center" key={key}>
      {children}
    </div>
  ),
  AlignBlockLeft: (children, { key }) => (
    <div className="align-left" key={key}>
      {children}
    </div>
  ),
  AlignBlockRight: (children, { key }) => (
    <div className="align-right" key={key}>
      {children}
    </div>
  ),
};

const linkPlugin = plugins[0];

export const defaultToolbarButtons = [
  BoldButton,
  ItalicButton,
  Underline,
  Strikethrough,
  linkPlugin.LinkButton,

  Separator,

  // HeaderOne, // this header style should probably not be available
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
  // CodeBlockButton,

  Separator,

  // ...config.settings.richTextEditorInlineToolbarButtons,
  // TODO: this is not good practice, should find a better way to test
  // buttons to remove
];
