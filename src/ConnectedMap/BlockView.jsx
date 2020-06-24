import React, { Component, useState, useEffect } from 'react';
import WebMap from '../WebMap/WebMap';

import { connect } from 'react-redux';

import { getMapData } from '../actions';

const ConnectedMapView = props => {
  const { mapData, id, block, getFreshData } = props;

  const [elementMapData, setElementMapData] = useState('');

  const [localMapData, setLocalMapData] = useState('');

  useEffect(() => {
    const elementLocalData = mapData && mapData[id] ? mapData[id] : '';

    const mapIdChanged = elementMapData.mapId !== elementLocalData.mapId;

    const filterChanged = elementMapData.filter !== elementLocalData.filter;

    const hasMapChanged = mapIdChanged || filterChanged;

    if (elementLocalData && hasMapChanged) {
      setElementMapData(elementLocalData);
    }
  }, [elementMapData.mapId, elementMapData.filter, id, mapData]);

  return (
    <div>
      {elementMapData.mapId && (
        <WebMap
          mapId={elementMapData.mapId}
          showLegend={''}
          showLayers={''}
          latitude={''}
          longitude={''}
          zoom={''}
          filter={elementMapData.filter}
          portalUrl={'https://eea.maps.arcgis.com'}
        />
      )}
      {!elementMapData.mapId && <p>No data to display map</p>}
    </div>
  );
};

export const mapStateToProps = state => ({
  mapData: state.map_data,
});

const mapDispatchToProps = dispatch => {
  return {
    getFreshData: () => dispatch(getMapData()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedMapView);
