import React, { Component } from 'react';
import WebMap from '../WebMap/WebMap';

const ConnectedMapView = props => {
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

export default ConnectedMapView;
