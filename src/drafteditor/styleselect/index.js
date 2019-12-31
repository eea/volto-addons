// import React from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';
import DefaultStyleDropdown from './StyleDropdown';

// import AddButton from './Button';
// import ColorBlock from './ColorBlock';
// import { ColorBlockToHTML } from './HTML';
// import * as types from './types';

export function makeStyleDropdown(config = {}) {
  const store = {
    getEditorState: undefined,
    setEditorState: undefined,
  };

  return {
    initialize: ({ getEditorState, setEditorState }) => {
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },

    StyleDropdown: decorateComponentWithProps(DefaultStyleDropdown, {
      store,
      // onRemoveLinkAtSelection: () =>
      //   store.setEditorState(removeEntity(store.getEditorState())),
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

  config.settings.customStyleMap = {
    ...config.settings.customStyleMap,

    'BG-RED': {
      'background-color': 'red',
      padding: '0.3rem',
    },
  };

  return config;
}
