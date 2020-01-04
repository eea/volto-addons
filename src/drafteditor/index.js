import React from 'react';
import {
  inlineRenderers,
  styleMap,
  defaultToolbarButtons,
  // customBlockStyleFn,
} from './toolbar';

import createBlockBreakoutPlugin from 'draft-js-block-breakout-plugin';
import createLinkPlugin from '@plone/volto/components/manage/AnchorPlugin';

// import installColorBlockPlugin from './colorblock';
// import installVideoPlugin from './video';
// import installStyleDropdownPlugin from './styleselect';

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

  // const blockBreakoutPlugin = createBlockBreakoutPlugin(breakOutOptions);
  // const linkPlugin = createLinkPlugin();

  // TODO: we need a better way to make this extensible
  config.settings.richTextEditorInlineToolbarButtons = defaultToolbarButtons; // .filter((button, index) => index !== 13 && index !== 14);

  // config.settings.richTextEditorPlugins = [linkPlugin, blockBreakoutPlugin];

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
        return (
          <span key={keys[0]} className="atomic-block">
            {children}
          </span>
        );
      },

      // unstyled: (children, { keys }) => {
      //   // console.log('unstyle children', children);
      //   const processedChildren = children.map(chunks =>
      //     chunks.map(child => {
      //       if (Array.isArray(child)) {
      //         return child.map((subchild, index) => {
      //           if (typeof subchild === 'string') {
      //             const last = subchild.split('\n').length - 1;
      //             return subchild.split('\n').map((item, index) => (
      //               <React.Fragment key={index}>
      //                 {item}
      //                 {index !== last && <br />}
      //               </React.Fragment>
      //             ));
      //           } else {
      //             return subchild;
      //           }
      //         });
      //       } else {
      //         return child;
      //       }
      //     }),
      //   );
      //   return processedChildren.map(
      //     chunk => chunk && <p key={keys[0]}>{chunk}</p>,
      //   );
      // },
    },
  };

  // installColorBlockPlugin(config);
  // installVideoPlugin(config);
  // installStyleDropdownPlugin(config);

  return config;
}
