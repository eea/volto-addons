import React, { Component } from 'react';
import WebMap from './WebMap';
import { SidebarPortal } from '@plone/volto/components'; // EditBlock
import { BlockEditForm } from 'volto-addons/BlockForm';

import schema from './schema';

const WebMapBlockEdit = props => {
  const { layerUrl } = props.data;

  return (
    <div>
      {layerUrl && <WebMap layerUrl={layerUrl} />}
      {!layerUrl && (
        <p style={{ textAlign: 'center', color: 'red', fontSize: '20px' }}>
          {' '}
          add layer url!{' '}
        </p>
      )}
      <SidebarPortal selected={props.selected}>
        <BlockEditForm
          schema={schema}
          ix
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
