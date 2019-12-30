import React from 'react';

import { composeDecorators } from 'draft-js-plugins-editor';
import createFocusPlugin from 'draft-js-focus-plugin';

import decorateComponentWithProps from 'decorate-component-with-props';
import AddButton from './Button';
import ColorBlock from './ColorBlock';
import * as types from './types';

export function makeColorBlockPlugin(config = {}) {
  const store = {
    getEditorState: undefined,
    setEditorState: undefined,
  };

  const component = config.decorator
    ? config.decorator(ColorBlock)
    : ColorBlock;

  return {
    initialize: ({ getEditorState, setEditorState }) => {
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },
    AddButton: decorateComponentWithProps(AddButton, {
      store,
    }),

    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === types.ATOMIC) {
        // TODO subject to change for draft-js next release
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();
        const { width } = entity.getData();

        if (type === types.COLORBLOCK) {
          return {
            component,
            editable: true,
            props: {
              width,
            },
          };
        }
      }
    },
  };
}

export default function applyConfig(config) {
  const focusPlugin = createFocusPlugin();
  const decorator = composeDecorators(focusPlugin.decorator);
  const colorBlockPlugin = makeColorBlockPlugin({ decorator });

  config.settings.richTextEditorPlugins = [
    focusPlugin,
    colorBlockPlugin,
    ...(config.settings.richTextEditorPlugins || []),
  ];

  config.settings.richTextEditorInlineToolbarButtons.push(
    colorBlockPlugin.AddButton,
  );

  config.settings.ToHTMLRenderers.entities = {
    ...config.settings.ToHTMLRenderers.entities,
    COLORBLOCK: (children, blockProps, { key }) => {
      return (
        <ColorBlock blockProps={blockProps} key={key}>
          {children}
        </ColorBlock>
      );
    },
  };
  return config;
}
