const TableauSchema = {
  title: 'Tableau',

  fieldsets: [
    {
      id: 'default',
      title: 'Default',
      fields: [
        'tableauVersion',
        'url',
        'hideTabs',
        'hideToolbars',
        'hideShare',
        'filters',
      ],
    },
  ],

  properties: {
    tableauVersion: {
      type: 'string',
      title: 'Tableau Version',
      choices: [['2.3.0', '2.3.0'], ['2.4.0', '2.4.0'], ['2.5.0', '2.5.0']],
    },
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
    hideShare: {
      type: 'boolean',
      title: 'Hide Share',
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
        [
          {
            'Member State': ['GE'],
          },
          'Germany',
        ],
        [
          {
            'Member State': ['RO'],
          },
          'Romania',
        ],
      ],
    },
  },

  required: ['tableauVersion', 'url'],
};

export default TableauSchema;
