import React, { Component } from 'react';
import WebMap from './WebMap';

const WebMapBlockView = props => {
  const { mapId, showLegend, showFilters, latitude, longitude, zoom } = props.data
  return (
    <div>
      {mapId &&
        <WebMap
          mapId={mapId}
          showLegend={showLegend}
          showFilters={showFilters}
          latitude={latitude}
          longitude={longitude}
          zoom={zoom} />
      }
    </div>
  );
}

export default WebMapBlockView;
