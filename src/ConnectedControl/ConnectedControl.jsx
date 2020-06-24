import React, { useState, useEffect } from 'react';
import { Field } from '@plone/volto/components';
import { Segment, Message, Button, Select } from 'semantic-ui-react';

import { connect } from 'react-redux';

import { changeMapData, getMapData } from '../actions';

const ConnectedControl = ({
  updateData,
  properties,
  mapData,
  getFreshData,
}) => {
  const [mapId, setMapId] = useState('');

  const [viewId, setViewId] = useState('');

  const allBlocks = properties.blocks;

  const filteredMapBlocks = Object.keys(allBlocks)
    .map(key => {
      return { ...allBlocks[key], value: key, text: key };
    })
    .filter(item => item['@type'] === 'connected_map');

  useEffect(() => {
    getFreshData();
  }, [getFreshData, mapId, viewId]);

  const handleViewSet = id => {
    setViewId(id);

    //get existing mapId from state
    const viewMapId = mapData && mapData[id] ? mapData[id].mapId : '';

    if (viewMapId !== mapId) {
      setMapId(viewMapId);
    }
  };

  const handleMapIdSet = mapId => {
    setMapId(mapId);

    const newMapData = {
      mapId,
    };

    const updatedMapData = {
      ...mapData,
      [viewId]: newMapData,
    };
    updateData(updatedMapData);
  };

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>Connected Map Edit</h2>
      </header>
      <Segment className="form sidebar-image-data">
        <Select
          placeholder="Select map id from this page"
          options={filteredMapBlocks}
          onChange={(e, data) => handleViewSet(data.value)}
        />
        <Field
          title="Map Id"
          id="map_id"
          value={mapId}
          //required={false}
          onChange={(id, value) => {
            handleMapIdSet(value);
          }}
          //block={block}
        />
        <Field
          title="Filter"
          id="filter"
          //value={formData[field]}
          //required={schema.required.indexOf(field) !== -1}
          onChange={(id, value) => {
            console.log('value', value, id);
          }}
          //block={block}
        />
      </Segment>
    </Segment.Group>
  );
};

export const mapStateToProps = state => ({
  mapData: state.map_data,
});

const mapDispatchToProps = dispatch => {
  return {
    updateData: mapData => dispatch(changeMapData(mapData)),
    getFreshData: () => dispatch(getMapData()),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedControl);
