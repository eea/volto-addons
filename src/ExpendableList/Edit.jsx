import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import _uniqueId from 'lodash/uniqueId';
import RenderFields from 'volto-addons/Widgets/RenderFields';
import View from './View';
import { settings } from '~/config';

const getSchema = props => {
  const isExpandable = props.data.isExpandable?.value;
  return {
    ordered: {
      title: 'Ordered',
      type: 'boolean',
    },
    isExpandable: {
      title: 'Is expandable',
      type: 'boolean',
    },
    listClassname: {
      title: 'List classname',
      type: 'text',
    },
    listItemClassname: {
      title: 'Item classname',
      type: 'text',
    },
    items: {
      title: 'List items',
      type: 'schema',
      fieldSetTitle: 'List items metadata',
      fieldSetId: 'list_items_metadata',
      fieldSetSchema: {
        fieldsets: [
          {
            id: 'default',
            title: 'title',
            fields: ['title', 'id', 'description'],
          },
        ],
        properties: {
          title: {
            title: 'Title',
            type: 'text',
          },
          id: {
            title: 'Id',
            type: 'text',
          },
          description: {
            title: 'Description',
            widget: 'textarea',
          },
        },
        required: () => {
          if (isExpandable) return ['id', 'title', 'description'];
          return ['id', 'title'];
        },
      },
      editFieldset: false,
      deleteFieldset: false,
    },
  };
};

const Edit = props => {
  const [state, setState] = useState({
    schema: getSchema({ ...props, providerUrl: settings.providerUrl }),
    id: _uniqueId('block_'),
  });
  useEffect(() => {
    setState({
      ...state,
      schema: getSchema({
        ...props,
      }),
    });
    /* eslint-disable-next-line */
  }, [props.data.isExpandable])
  return (
    <div>
      <RenderFields schema={state.schema} {...props} title="Navigation block" />
      <View {...props} id={state.id} />
    </div>
  );
};

export default compose(
  connect((state, props) => ({
    pathname: state.router.location.pathname,
  })),
)(Edit);
