import React, { Component, useState, useEffect } from 'react';

const ConnectedMapEdit = props => {
  // const { mapData, id, block } = props;

  // const [elementMapData, setElementMapData] = useState('');
  // const [localMapData, setLocalMapData] = useState();

  // const handleControlChange = () => {
  //   const localStorageData = JSON.parse(localStorage.getItem('mapData'));

  //   console.log('got new data', localStorageData);

  //   const elementLocalData =
  //     localStorageData && localStorageData[id] ? localStorageData[id] : '';

  //   console.log('elementLocalData', elementLocalData);
  //   if (elementMapData.mapId !== elementLocalData.mapId) {
  //     console.log('element state', elementMapData);
  //     console.log('element local', elementLocalData);
  //     setElementMapData(elementLocalData);
  //   }
  // };

  return (
    <div>
      <p style={{ textAlign: 'center', color: 'red', fontSize: '20px' }}>
        Viewable from View
      </p>
    </div>
  );
};

export default ConnectedMapEdit;
