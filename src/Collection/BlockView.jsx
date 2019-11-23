import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TilesListing from './TilesListing';
import { getBaseUrl } from '@plone/volto/helpers';
import { getContentWithData } from '../actions';
import Filter from './Filter';

class BlockView extends Component {
  constructor(props) {
    super(props);

    this.updateContent = this.updateContent.bind(this);
    this.getRequestKey = this.getRequestKey.bind(this);
    this.filterItems = this.filterItems.bind(this);

    this.state = {
      results: [],
      activeFilter: null,
    };
  }

  getRequestKey() {
    return `col-content:${this.props.block}`;
  }

  updateContent() {
    const path = this.props.data.collection_url;
    if (!path) return;

    const url = `${getBaseUrl(path)}`;
    this.props.getContentWithData(url, null, this.getRequestKey(), {
      metadata_fields: '_all',
    });
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
      this.setState({ results: now.data.items });
    }
  }

  componentDidMount() {
    this.updateContent();
  }

  filterItems() {
    const results = this.state.results || [];
    const filterFor = this.state.activeFilter;
    const index_name = this.props.data.index_name;

    if (!(filterFor && index_name)) return results;

    return results.filter(obj =>
      obj[index_name].indexOf(filterFor) > -1 ? true : false,
    );
  }

  render() {
    return this.state.results ? (
      <div>
        <TilesListing items={this.filterItems()} />
        {this.props.data.index_name ? (
          <Filter
            handleSelectFilter={(ev, { name }) =>
              this.setState({ activeFilter: name })
            }
            index_name={this.props.data.index_name}
            selectedValue={this.state.activeFilter}
            results={this.state.items}
          />
        ) : (
          ''
        )}
      </div>
    ) : (
      ''
    );
  }
}

BlockView.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(
  (state, props) => ({
    contentSubrequests: state.content.subrequests,
  }),
  {
    getContentWithData,
  },
)(BlockView);
