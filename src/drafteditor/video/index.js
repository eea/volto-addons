import React from 'react';
import createVideoPlugin from 'draft-js-video-plugin';
import VideoAdd from './VideoAdd';
import VideoBlock from 'draft-js-video-plugin/lib/video/components/DefaultVideoComponent';

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
      return (
        <VideoBlock blockProps={blockProps} theme={{ iframe: null }}>
          Video block
        </VideoBlock>
      );
    },
  };

  config.settings.richTextEditorInlineToolbarButtons.push(Button);
}
