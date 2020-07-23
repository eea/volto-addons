import React, { Component } from 'react';
import WebMap from './WebMap';

const WebMapBlockView = props => {
  if (!__CLIENT__) return '';
  const { layerUrl } = props.data;
  return <div>{layerUrl && <WebMap layerUrl={layerUrl} />}</div>;
};

export default WebMapBlockView;
