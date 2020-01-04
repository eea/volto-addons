import React from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';
import DefaultStyleDropdown from './StyleDropdown';
import {
  // addBreaklines,
  unstyledRenderChildren,
} from 'volto-addons/drafteditor/utils';

import './styles.css';

export function makeStyleDropdown(config = {}) {
  const store = {
    getEditorState: undefined,
    setEditorState: undefined,
    getEditorRef: undefined,
  };

  return {
    initialize: ({ getEditorState, setEditorState, getEditorRef }) => {
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
      store.getEditorRef = getEditorRef;
    },

    StyleDropdown: decorateComponentWithProps(DefaultStyleDropdown, {
      store,
    }),

    // blockRendererFn: (block, { getEditorState }) => {
    //   if (block.getType() === types.ATOMIC) {
    //     // TODO subject to change for draft-js next release
    //     const contentState = getEditorState().getCurrentContent();
    //     const entity = contentState.getEntity(block.getEntityAt(0));
    //     const type = entity.getType();
    //     const { width } = entity.getData();
    //
    //     if (type === types.COLORBLOCK) {
    //       return {
    //         component: ColorBlock,
    //         editable: false,
    //         props: {
    //           width,
    //         },
    //       };
    //     }
    //   }
    // },
  };
}

export default function applyConfig(config) {
  const plugin = makeStyleDropdown();

  config.settings.richTextEditorPlugins = [
    ...(config.settings.richTextEditorPlugins || []),
    plugin,
  ];
  config.settings.richTextEditorInlineToolbarButtons = [
    plugin.StyleDropdown,
    ...config.settings.richTextEditorInlineToolbarButtons,
  ];

  // used by draft-js editor to apply custom styles to inline styles
  config.settings.customStyleMap = {
    ...config.settings.customStyleMap,

    'BG-RED': {
      'background-color': 'red',
      padding: '0.3rem',
    },
  };

  // used by the custom blockStyleFn to map block types to class names
  config.settings.blockStyleMap = {
    ...config.settings.blockStyleMap,
    'BLOCK-BG-RED': 'block-bg-red',
  };

  // redraft configuration, converts draftjs raw to html render
  config.settings.ToHTMLRenderers = {
    ...config.settings.ToHTMLRenderers,
    blocks: {
      ...config.settings.ToHTMLRenderers.blocks,

      'BLOCK-BG-RED': (children, { data, keys }) => (
        <div className="block-bg-red" key={keys[0]}>
          {children}
        </div>
      ),
    },
    inline: {
      ...config.settings.ToHTMLRenderers.inline,
      'BG-RED': (children, { key }) => (
        <span className="bg-red" key={key}>
          {unstyledRenderChildren(children, { keys: [key] })}
        </span>
      ),
    },
  };

  config.settings.extendedBlockRenderMap = {
    ...config.settings.extendedBlockRenderMap,
    'BLOCK-BG-RED': {
      element: 'pre',
    },
  };

  return config;
}
