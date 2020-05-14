const WebMap = {
    title: 'WebMap',
  
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['mapId', 'showLegend', 'showFilters'],
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
      
    },
    required: ['mapId'],
  
  };
  
  export default WebMap;