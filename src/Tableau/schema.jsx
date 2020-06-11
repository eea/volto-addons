const TableauSchema = {
  title: 'Tableau',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: ['url', 'hideTabs', 'hideToolbars', 'filters'],
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
    },
    //to be refined
    filters: {
      title: 'Filter',
      choices: [
        [
          {
            'Member State': ['BE'],
          },
          'Belgium',
        ],
      ],
    },
  },

  required: ['url'],
};

export default TableauSchema;
