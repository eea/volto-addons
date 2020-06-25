import React, { Component, useState, useEffect } from 'react';
import WebMap from '../WebMap/WebMap';

import { connect } from 'react-redux';

import { getMapData } from '../actions';

const ConnectedMapView = props => {
  const { mapData, id } = props;

  const [elementMapData, setElementMapData] = useState('');

  useEffect(() => {
    const elementLocalData = mapData && mapData[id] ? mapData[id] : '';

    const mapIdChanged = elementMapData.mapId !== elementLocalData.mapId;

    const filterChanged = elementMapData.filter !== elementLocalData.filter;

    const portalChanged =
      elementMapData.portalUrl !== elementLocalData.portalUrl;

    const zoomChanged = elementMapData.zoom !== elementLocalData.zoom;

    const legendChanged =
      elementMapData.showLegend !== elementLocalData.showLegend;

    const hasMapChanged =
      mapIdChanged ||
      filterChanged ||
      portalChanged ||
      zoomChanged ||
      legendChanged;

    if (elementLocalData && hasMapChanged) {
      setElementMapData(elementLocalData);
    }
  }, [
    elementMapData.mapId,
    elementMapData.filter,
    id,
    mapData,
    elementMapData.portalUrl,
    elementMapData.zoom,
    elementMapData.showLegend,
  ]);

  return (
    <div>
      {elementMapData.mapId && (
        <WebMap
          mapId={elementMapData.mapId}
          showLegend={elementMapData.showLegend}
          showLayers={''}
          latitude={''}
          longitude={''}
          zoom={elementMapData.zoom}
          filter={elementMapData.filter}
          portalUrl={elementMapData.portalUrl}
        />
      )}
      {!elementMapData.mapId && <p>No data to display map</p>}
    </div>
  );
};

export const mapStateToProps = state => ({
  mapData: state.map_data,
});

export default connect(mapStateToProps)(ConnectedMapView);
