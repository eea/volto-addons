import React, { Component } from 'react';
import WebMap from './WebMap';

const WebMapBlockView = props => {
  const { mapId, showLegend, showLayers, latitude, longitude, zoom, filter } = props.data
  return (
    <div>
      {mapId &&
        <WebMap
          mapId={mapId}
          showLegend={showLegend}
          showLayers={showLayers}
          latitude={latitude}
          longitude={longitude}
          zoom={zoom}
          filter={filter}
        />
      }
    </div>
  );
}

export default WebMapBlockView;
