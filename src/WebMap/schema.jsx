const WebMap = {
  title: 'WebMap',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['mapId',"portalUrl","filter", 'latitude', 'longitude', 'zoom', 'showLegend', 'showLayers', "showCoordWidget"],
    },
  ],

  properties: {
    mapId: {
      type: 'string',
      title: 'Map ID',
    },
    latitude: {
      type: 'number',
      title: 'Latitude',
    },
    longitude: {
      type: 'number',
      title: 'Longitude',
    },
    zoom: {
      type: 'number',
      title: 'Zoom',
    },
    showLegend: {
      type: 'boolean',
      title: 'Show Legend',
    },
    showLayers: {
      type: 'boolean',
      title: 'Show Layers',
    },
    showCoordWidget: {
      type: 'boolean',
      title: 'Show Coordinates Widget',
    },
    filter: {
      type: 'string',
      title: "Filter by Country Code"
    },
    portalUrl: {
      type: "string",
      title: "Portal URL"
    }

  },
  required: ['mapId'],

};

export default WebMap;