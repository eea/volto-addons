
const TableauSchema = {
  title: 'Tableau',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['url', 'hideTabs', 'hideToolbars'],
    },
  ],

  properties: {
    url: {
      type: 'string',
      title: 'Tableau Viz Url',
    },
    hideTabs: {
      type: 'boolean',
      title: 'Hide Tabs',
    },
    hideToolbars: {
      type: 'boolean',
      title: 'Hide Toolbars',
    }
  },

  required: ['url'],
};

export default TableauSchema;
