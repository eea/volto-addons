import React, { Component } from 'react';
import WebMap from 'volto-addons/WebMap/WebMap';

const WebMapBlockView = props => {
  const {
    mapId,
    showLegend,
    showLayers,
    latitude,
    longitude,
    zoom,
    filter,
    portalUrl,
  } = props.data;

  console.log('filter in view', filter)
  return (
    <div>
      {mapId && (
        <WebMap
          mapId={mapId}
          showLegend={showLegend}
          showLayers={showLayers}
          latitude={latitude}
          longitude={longitude}
          zoom={zoom}
          filter={filter}
          portalUrl={portalUrl}
        />
      )}
    </div>
  );
};

export default WebMapBlockView;
