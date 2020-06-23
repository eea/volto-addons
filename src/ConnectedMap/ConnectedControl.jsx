import React, { useState, useEffect } from 'react';
import { Field } from '@plone/volto/components';
import { Segment, Message, Button } from 'semantic-ui-react';

import { connect } from 'react-redux';

import { changeMapData } from '../actions';

const ConnectedControl = ({ mapData, block, id, updateData, onChange }) => {
  const [mapId, setMapId] = useState();
  const [localMapData, setLocalMapData] = useState({});

  useEffect(() => {
    //here goes to redux
    //updateData(newMapData);

    const newMapData = {
      mapId,
    };

    //here using localstorage
    const existingLocalMapData = JSON.parse(localStorage.getItem('mapData'));
    console.log('existingmapdata', existingLocalMapData);
    //check for existing mapData on the same page element and edits it
    const hasMapData = existingLocalMapData && existingLocalMapData[id];

    if (hasMapData) {
      console.log('existingmemmem', existingLocalMapData[id]);

      const sameMapData = existingLocalMapData[id] === newMapData;

      if (!sameMapData) {
        const updatedMapData = { ...existingLocalMapData, [id]: newMapData };

        console.log('udpatedmapdata', updatedMapData);
        setMapId(newMapData.mapId);
        localStorage.setItem('mapData', JSON.stringify(updatedMapData));
        onChange();
      }
    } else {
      console.log('there is no data, adding data');
      setMapId(newMapData.mapId);
      localStorage.setItem('mapData', JSON.stringify({ [id]: newMapData }));
      onChange();
    }
  }, [id, localMapData, mapId, onChange]);

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
      </Segment>
    </Segment.Group>
  );
};

export default ConnectedControl;
