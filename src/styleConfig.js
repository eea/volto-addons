import React from 'react';
import createInlineStyleButton from 'draft-js-buttons/lib/utils/createInlineStyleButton';
import createBlockStyleButton from 'draft-js-buttons/lib/utils/createBlockStyleButton';
import Icon from '@plone/volto/components/theme/Icon/Icon';
import underlineSVG from '@plone/volto/icons/underline.svg';
import strickthroughSVG from '@plone/volto/icons/strickthrough.svg';
import headingSVG from '@plone/volto/icons/heading.svg';
import alignLeftSVG from '@plone/volto/icons/align-left.svg';
import alignRightSVG from '@plone/volto/icons/align-right.svg';
import alignCenterSVG from '@plone/volto/icons/align-center.svg';

export const Underline = createInlineStyleButton({
  style: 'UNDERLINE',
  children: <Icon name={underlineSVG} size="24px" />,
});

export const Strikethrough = createInlineStyleButton({
  style: 'STRIKETHROUGH',
  children: <Icon name={strickthroughSVG} size="24px" />,
});

export const HeaderButton = createBlockStyleButton({
  blockType: 'header-one',
  children: <Icon name={headingSVG} size="24px" />,
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
