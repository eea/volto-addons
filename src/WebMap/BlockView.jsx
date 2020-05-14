import React, { Component } from 'react';
import WebMap from './WebMap';

const WebMapBlockView = props => {
  const hasMapId = props.data.mapId
  return (
    <div>
      {hasMapId &&
        <WebMap mapId={props.data.mapId} legend={props.data.legend} />
      }
    </div>
  );
}

export default WebMapBlockView;
