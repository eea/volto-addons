import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { injectIntl } from 'react-intl';
import View from './View';

import RenderFields from '../Widgets/RenderFields';

const schema = {
  title: {
    title: 'Title',
    type: 'text',
  },
  paths: {
    title: 'Paths',
    type: 'array',
  },
  placeholder: {
    title: 'Placeholder',
    type: 'text',
  },
  searchButton: {
    title: 'Search button',
    type: 'checkbox',
  },
  buttonText: {
    title: 'Button text',
    type: 'text',
    requires: 'searchButton',
  },
  buttonClassName: {
    title: 'Button class name',
    type: 'text',
    requires: 'searchButton',
  },
};

const Edit = props => {
  if (__SERVER__) {
    return <div />;
  }
  return (
    <div>
      <RenderFields schema={schema} {...props} title="Search block" />
      <View {...props} />
    </div>
  );
};

export default compose(
  injectIntl,
  connect(state => ({
    content: state.content.data,
  })),
)(Edit);
