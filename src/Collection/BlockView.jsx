import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TilesListing from './TilesListing';
import { getBaseUrl } from '@plone/volto/helpers';
import { getContent } from '@plone/volto/actions';

class View extends Component {
  constructor(props) {
    super(props);

    this.updateContent = this.updateContent.bind(this);
    this.getRequestKey = this.getRequestKey.bind(this);

    this.state = {
      items: [],
    };
  }

  getRequestKey() {
    return `col-content:${this.props.block}`;
  }

  updateContent() {
    const path = this.props.data.collection_url;
    if (!path) return;

    const url = `${getBaseUrl(path)}`;
    this.props.getContent(url, null, this.getRequestKey());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.collection_url !== this.props.data.collection_url) {
      return this.updateContent();
    }
    const key = this.getRequestKey();
    if (!prevProps.contentSubrequests[key]) {
      return;
    }

    const prev = prevProps.contentSubrequests[key];
    const now = this.props.contentSubrequests[key];

    if (prev.loading && now.loaded) {
      this.setState({ items: now.data.items });
    }
  }

  componentDidMount() {
    this.updateContent();
  }

  render() {
    return this.state.items ? <TilesListing items={this.state.items} /> : '';
  }
}

View.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(
  (state, props) => ({
    contentSubrequests: state.content.subrequests,
  }),
  {
    getContent,
  },
)(View);
