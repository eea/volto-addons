import React from 'react';
import decorateComponentWithProps from 'decorate-component-with-props';
import AddButton from './Button';
import ColorBlock from './ColorBlock';
// import { ColorBlockToHTML } from './HTML';
import * as types from './types';

export function makeColorBlockPlugin(config = {}) {
  const store = {
    getEditorState: undefined,
    setEditorState: undefined,
  };

  return {
    initialize: ({ getEditorState, setEditorState }) => {
      store.getEditorState = getEditorState;
      store.setEditorState = setEditorState;
    },
    AddButton: decorateComponentWithProps(AddButton, {
      store,
      // onRemoveLinkAtSelection: () =>
      //   store.setEditorState(removeEntity(store.getEditorState())),
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
            component: ColorBlock,
            editable: false,
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
  const plugin = makeColorBlockPlugin();

  config.settings.richTextEditorPlugins = [
    plugin,
    ...(config.settings.richTextEditorPlugins || []),
  ];
  config.settings.richTextEditorInlineToolbarButtons.push(plugin.AddButton);

  config.settings.ToHTMLRenderers.entities = {
    ...config.settings.ToHTMLRenderers.entities,
    COLORBLOCK: (children, entity, { key }) => {
      console.log('color block', children, entity, key);
      return (
        <a href="/bla" key={key} src={entity.src} alt={entity.alt}>
          blabla
        </a>
      );
    },
    'draft-js-video-plugin-video': (children, entity, { key }) => {
      console.log('video block', children, entity, key);
      return (
        <a href="/bla" key={key} src={entity.src} alt={entity.alt}>
          blabla
        </a>
      );
    },
  };
  return config;
}
