const WebMap = {
    title: 'WebMap',
  
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['mapId', 'showLegend', 'showFilters', 'latitude', 'longitude', 'zoom'],
      },
    ],
  
    properties: {
      mapId: {
        type: 'string',
        title: 'Map ID',
      },
      showLegend: {
        type: 'boolean',
        title: 'Show Legend',
      },
      showFilters: {
        type: 'boolean',
        title: 'Show Filters',
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
      
    },
    required: ['mapId'],
  
  };
  
  export default WebMap;