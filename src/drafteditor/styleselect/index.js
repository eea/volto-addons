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
      backgroundColor: 'lightblue',
      padding: '0.3rem',
    },
    'BLOCK-ELEMENT': {
      display: 'block',
    },
    'INLINE-CENTERED': {
      display: 'inline-block',
      verticalAlign: 'middle',
    },
    'LARGE-TEXT': {
      fontSize: '50px',
    },
    'GREEN-COLOR': {
      color: '#251',
    },
    'BLUE-COLOR': {
      color: '#002d54',
    },
    'BROWN-COLOR': {
      color: '#543',
    },
  };

  // used by the custom blockStyleFn to map block types to class names
  config.settings.blockStyleMap = {
    ...config.settings.blockStyleMap,
    'BLOCK-BG-GREY': 'block-bg-grey',
  };

  // TODO: explain what this is
  config.settings.extendedBlockRenderMap = {
    ...config.settings.extendedBlockRenderMap,
    'BLOCK-BG-GREY': {
      element: 'pre',
    },
  };

  // redraft configuration, converts draftjs raw to html render
  config.settings.ToHTMLRenderers = {
    ...config.settings.ToHTMLRenderers,
    blocks: {
      ...config.settings.ToHTMLRenderers.blocks,

      'BLOCK-BG-GREY': (children, { data, keys }) => (
        <div className="block-bg-grey" key={keys[0]}>
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
      'BLOCK-ELEMENT': (children, { key }) => (
        <span className="block-element" key={key}>
          {unstyledRenderChildren(children, { keys: [key] })}
        </span>
      ),
      'INLINE-CENTERED': (children, { key }) => (
        <span className="inline-centered" key={key}>
          {unstyledRenderChildren(children, { keys: [key] })}
        </span>
      ),
      'LARGE-TEXT': (children, { key }) => (
        <span className="large-text" key={key}>
          {unstyledRenderChildren(children, { keys: [key] })}
        </span>
      ),
      'GREEN-COLOR': (children, { key }) => (
        <span className="green-color" key={key}>
          {unstyledRenderChildren(children, { keys: [key] })}
        </span>
      ),
      'BLUE-COLOR': (children, { key }) => (
        <span className="blue-color" key={key}>
          {unstyledRenderChildren(children, { keys: [key] })}
        </span>
      ),
      'BROWN-COLOR': (children, { key }) => (
        <span className="brown-color" key={key}>
          {unstyledRenderChildren(children, { keys: [key] })}
        </span>
      ),
    },
  };

  return config;
}
