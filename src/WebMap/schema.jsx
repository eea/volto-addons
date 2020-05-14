const WebMap = {
    title: 'WebMap',
  
    fieldsets: [
      {
        id: 'default',
        title: 'Default',
        fields: ['mapId', 'legend'],
      },
    ],
  
    properties: {
      mapId: {
        type: 'string',
        title: 'Map ID',
      },
      legend: {
        type: 'boolean',
        title: 'Show Legend',
      },
      
      
    },
  
    required: ['display', 'cards'],
  };
  
  export default WebMap;