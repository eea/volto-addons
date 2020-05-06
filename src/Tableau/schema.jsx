
const TableauSchema = {
  title: 'Tableau',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['url', 'hidetabs', 'hidetoolbars','onFirstInteractive', 'onFirstVizSizeKnown'],
    },
  ],

  properties: {
    url: {
      type: 'string',
      title: 'Tableau Viz Url',
    },
    hidetabs: {
      type: 'boolean',
      title: 'Hide Tabs',
    },
    hidetoolbars: {
      type: 'boolean',
      title: 'Hide Toolbars',
    }
  },

  required: ['url'],
};

export default TableauSchema;
