import React from 'react';
import createVideoPlugin from 'draft-js-video-plugin';
import VideoAdd from './VideoAdd';
// import VideoBlock from 'draft-js-video-plugin/video/components/DefaultVideoComponent';
// const draft = require('draft-js-video-plugin/video/components/DefaultVideoComponent');

export default function applyConfig(config) {
  const store = {
    getEditorState: null,
    setEditorState: null,
  };
  const videoPlugin = {
    initialize({ getEditorState, setEditorState }) {
      store.setEditorState = setEditorState;
      store.getEditorState = getEditorState;
    },
    ...createVideoPlugin(),
  };

  const Button = props => (
    <VideoAdd
      editorState={store.getEditorState()}
      onChange={store.setEditorState}
      modifier={videoPlugin.addVideo}
    />
  );

  config.settings.richTextEditorPlugins = [
    videoPlugin,
    ...(config.settings.richTextEditorPlugins || []),
  ];

  config.settings.ToHTMLRenderers.entities = {
    ...config.settings.ToHTMLRenderers.entities,
    'draft-js-video-plugin-video': (children, blockProps, { key }) => {
      // TODO: needs to be properly rendered. I'd like to reuse the component
      // from draft-js-video-plugin, but for some reason I can't import it.
      // It might work with a webpack resolve alias
      return <div blockProps={blockProps}>Video block</div>;
    },
  };

  config.settings.richTextEditorInlineToolbarButtons.push(Button);
}
