import decorateComponentWithProps from 'decorate-component-with-props';
import AddButton from './Button';
import ColorBlock from './ColorBlock';
import { ColorBlockToHTML } from './HTML';
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
      // console.log('blockrenderfn', block);
      if (block.getType() === types.ATOMIC) {
        // TODO subject to change for draft-js next release
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();
        const { width } = entity.getData();
        // if (type === types.COLORBLOCK) {
        //   return {
        //     component: ColorBlock,
        //     editable: false,
        //     props: {
        //       width,
        //     },
        //   };
        // }
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

  // config.settings.ToHTMLRenderers.entities['COLORBLOCK'] = ColorBlockToHTML;
}

// AddButton: decorateComponentWithProps(ColorBlockButton, {
//   ownTheme: colorBlockStyles,
//   placeholder,
// }),
// import ColorBlockButton from './Button';
// import colorBlockStyles from './css/colorBlockStyles.module.css';
// const placeholder = '-color block placeholder-';
// initialize() {
//   console.log('initialize', arguments);
// },
