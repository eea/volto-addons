import React, { Component, useState, useEffect } from 'react';
import { SidebarPortal } from '@plone/volto/components'; // EditBlock

import WebMap from '../WebMap/WebMap';
import ConnectedControl from './ConnectedControl';

const ConnectedMapEdit = props => {
  const { mapData, id, block } = props;

  const [elementMapData, setElementMapData] = useState('');
  const [localMapData, setLocalMapData] = useState();

  const handleControlChange = () => {
    const localStorageData = JSON.parse(localStorage.getItem('mapData'));

    console.log('got new data', localStorageData);

    const elementLocalData =
      localStorageData && localStorageData[id] ? localStorageData[id] : '';

    console.log('elementLocalData', elementLocalData);
    if (elementMapData.mapId !== elementLocalData.mapId) {
      console.log('element state', elementMapData);
      console.log('element local', elementLocalData);
      setElementMapData(elementLocalData);
    }
  };

  const {
    showLegend,
    showLayers,
    latitude,
    longitude,
    zoom,
    showCoordWidget,
    filter,
    portalUrl,
  } = props.data;

  return (
    <div>
      {elementMapData && (
        <WebMap
          mapId={elementMapData.mapId}
          showLegend={showLegend}
          showLayers={showLayers}
          latitude={latitude}
          longitude={longitude}
          zoom={zoom}
          showCoordWidget={showCoordWidget}
          filter={filter}
          portalUrl="https://eea.maps.arcgis.com"
        />
      )}
      {!elementMapData && (
        <React.Fragment>
          <p style={{ textAlign: 'center', color: 'red', fontSize: '20px' }}>
            Select Map ID from sidebar!
          </p>
        </React.Fragment>
      )}
      <SidebarPortal selected={props.selected}>
        <ConnectedControl
          block={block}
          id={id}
          onChange={handleControlChange}
        />
      </SidebarPortal>
    </div>
  );
};

export default ConnectedMapEdit;
