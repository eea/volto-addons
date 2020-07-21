import React, { useState, useEffect } from 'react';
import { Field } from '@plone/volto/components';
import { Segment, Message, Button, Select } from 'semantic-ui-react';

import { connect } from 'react-redux';
import { compose } from 'redux';
import { asyncConnect } from 'redux-connect';
import { changeMapData, getMapData } from '../actions';

const ConnectedControl = ({
  updateData,
  properties,
  mapData,
  getFreshData,
}) => {
  const [mapId, setMapId] = useState('');

  const [viewId, setViewId] = useState('');

  const [filter, setFilter] = useState('');

  const [portalUrl, setPortalUrl] = useState('');

  const [zoom, setZoom] = useState('');

  const [showLegend, setShowLegend] = useState('');

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

    //get existing mapId from props
    const viewMapId = mapData && mapData[id] ? mapData[id].mapId : '';
    if (viewMapId !== mapId) {
      setMapId(viewMapId);
    }

    //get existing filter from props
    const existingFilter = mapData && mapData[id] ? mapData[id].filter : '';
    if (existingFilter !== filter) {
      setFilter(existingFilter);
    }

    //get existing portal from props
    const existingPortal = mapData && mapData[id] ? mapData[id].portalUrl : '';
    if (existingPortal !== portalUrl) {
      setPortalUrl(existingPortal);
    }

    //get existing zoom from props
    const existingZoom = mapData && mapData[id] ? mapData[id].zoom : '';
    if (existingZoom !== zoom) {
      setZoom(existingZoom);
    }

    //get existing legend from props
    const existingLegend = mapData && mapData[id] ? mapData[id].showLegend : '';
    if (existingLegend !== showLegend) {
      setShowLegend(existingLegend);
    }
  };

  const handleMapIdSet = mapId => {
    setMapId(mapId);
    const hasData = mapData && mapData[viewId];
    const newMapData = hasData
      ? {
          ...mapData[viewId],
          mapId,
        }
      : {
          mapId,
        };

    const updatedMapData = {
      ...mapData,
      [viewId]: newMapData,
    };
    updateData(updatedMapData);
  };

  const handleFilterChange = filter => {
    setFilter(filter);
    const hasData = mapData && mapData[viewId];
    const newMapData = hasData
      ? {
          ...mapData[viewId],
          filter,
        }
      : {
          filter,
        };
    const updatedMapData = {
      ...mapData,
      [viewId]: newMapData,
    };
    updateData(updatedMapData);
  };

  const handlePortalUrl = url => {
    setPortalUrl(url);
    const hasData = mapData && mapData[viewId];
    const newMapData = hasData
      ? {
          ...mapData[viewId],
          portalUrl: url,
        }
      : {
          portalUrl: url,
        };

    const updatedMapData = {
      ...mapData,
      [viewId]: newMapData,
    };
    updateData(updatedMapData);
  };

  const handleZoomChange = value => {
    setZoom(value);

    const hasData = mapData && mapData[viewId];
    const newMapData = hasData
      ? {
          ...mapData[viewId],
          zoom: value,
        }
      : {
          zoom: value,
        };

    const updatedMapData = {
      ...mapData,
      [viewId]: newMapData,
    };
    updateData(updatedMapData);
  };

  const handleLegendChange = value => {
    setShowLegend(value);

    const hasData = mapData && mapData[viewId];
    const newMapData = hasData
      ? {
          ...mapData[viewId],
          showLegend: value,
        }
      : {
          showLegend: value,
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
          title="Portal Url"
          id="portal_url"
          value={portalUrl}
          //required={false}
          onChange={(id, value) => {
            handlePortalUrl(value);
          }}
          //block={block}
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
          title="Filter by country code"
          id="filter"
          value={filter}
          //required={schema.required.indexOf(field) !== -1}
          onChange={(id, value) => {
            handleFilterChange(value);
          }}
          //block={block}
        />
        <Field
          title="Zoom"
          id="zoom"
          value={zoom}
          //required={false}
          onChange={(id, value) => {
            handleZoomChange(value);
          }}
          //block={block}
        />
        <Field
          title="Show Legend"
          id="legend"
          value={showLegend}
          type="boolean"
          //required={false}
          onChange={(id, value) => {
            handleLegendChange(value);
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
export default compose(
  asyncConnect([
    {
      key: 'mapData',
      promise: ({ location, store: { dispatch } }) =>__SERVER__ && dispatch(getMapData())
    }
  ]),
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(ConnectedControl);
