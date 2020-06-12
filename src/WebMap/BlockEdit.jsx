import React, { Component } from 'react';
import WebMap from './WebMap';
import { SidebarPortal } from '@plone/volto/components'; // EditBlock
import { BlockEditForm } from 'volto-addons/BlockForm';

import schema from './schema';

const WebMapBlockEdit = props => {
  const {
    mapId,
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
      {mapId && (
        <WebMap
          mapId={mapId}
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
      {!mapId && (
        <p style={{ textAlign: 'center', color: 'red', fontSize: '20px' }}>
          {' '}
          Select Map ID from sidebar!{' '}
        </p>
      )}
      <SidebarPortal selected={props.selected}>
        <BlockEditForm
          schema={schema}
          title={schema.title}
          onChangeField={(id, value) => {
            props.onChangeBlock(props.block, {
              ...props.data,
              [id]: value,
            });
          }}
          formData={props.data}
          block={props.block}
        />
      </SidebarPortal>
    </div>
  );
};

export default WebMapBlockEdit;
