const OpenLayersMap = {
  title: 'OpenLayersMap',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['layerUrl'],
    },
  ],

  properties: {
    layerUrl: {
      type: 'string',
      title: 'Layer url',
    },
  },
  required: ['layerUrl'],
};

export default OpenLayersMap;
