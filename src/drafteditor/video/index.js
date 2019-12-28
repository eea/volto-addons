import React from 'react';
import createVideoPlugin from 'draft-js-video-plugin';
import VideoAdd from './VideoAdd';

export default function applyConfig(config) {
  const store = {
    getEditorState: null,
    setEditorState: null,
  };
  const videoPlugin = {
    ...createVideoPlugin(),
    initialize({ getEditorState, setEditorState }) {
      store.setEditorState = setEditorState;
      store.getEditorState = getEditorState;
    },
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
  config.settings.richTextEditorInlineToolbarButtons.push(Button);
}
