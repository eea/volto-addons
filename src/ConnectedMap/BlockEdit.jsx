import React, { Component, useState, useEffect } from 'react';
import { SidebarPortal } from '@plone/volto/components'; // EditBlock
import { Field } from '@plone/volto/components';
import { Segment, Message } from 'semantic-ui-react';

import WebMap from '../WebMap/WebMap';
import ConnectedControl from './ConnectedControl';

import { connect } from 'react-redux';

import { changeMapData } from '../actions';

const ConnectedMapEdit = props => {
  const { mapData, id, block } = props;

  const [elementMapData, setElementMapData] = useState('');

  useEffect(() => {
    const filteredData =
      mapData.length !== 0 ? mapData.filter(element => element.id === id) : '';
    setElementMapData(filteredData[0]);
  }, [id, mapData]);

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
          portalUrl={portalUrl}
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
        <ConnectedControl block={block} id={id} />
      </SidebarPortal>
    </div>
  );
};

export const mapStateToProps = state => ({
  mapData: state.map_data,
});

const mapDispatchToProps = dispatch => {
  return {
    updateData: mapData => dispatch(changeMapData(mapData)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedMapEdit);
