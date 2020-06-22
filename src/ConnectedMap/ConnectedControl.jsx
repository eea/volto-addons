import React, { useState, useEffect } from 'react';
import { Field } from '@plone/volto/components';
import { Segment, Message, Button } from 'semantic-ui-react';

import { connect } from 'react-redux';

import { changeMapData } from '../actions';

const ConnectedControl = ({ mapData, block, id, updateData }) => {
  const [mapId, setMapId] = useState('');

  const newMapData = {
    id,
    mapId,
  };

  useEffect(() => {}, [mapId, mapData, id]);

  return (
    <Segment.Group raised>
      <header className="header pulled">
        <h2>Connected Map Edit</h2>
      </header>
      <Segment className="form sidebar-image-data">
        <Field
          title="Map Id"
          value={mapId}
          //required={false}
          onChange={(id, value) => {
            console.log('value', value, id);
            setMapId(value);
          }}
          //block={block}
        />
        <Field
          title="Filter"
          //value={formData[field]}
          //required={schema.required.indexOf(field) !== -1}
          onChange={(id, value) => {
            console.log('value', value, id);
          }}
          //block={block}
        />
        <Button onClick={() => updateData(newMapData)}>Update</Button>
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
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConnectedControl);
