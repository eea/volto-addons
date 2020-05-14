import React, { Component } from 'react';
import WebMap from './WebMap';

const WebMapBlockView = props => {
  const hasMapId = props.data.mapId
  return (
    <div>
      {hasMapId &&
        <WebMap mapId={props.data.mapId} showLegend={props.data.showLegend} showFilters={props.data.showFilters} />
      }
    </div>
  );
}

export default WebMapBlockView;
