import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TilesListing from './TilesListing';
import { getBaseUrl } from '@plone/volto/helpers';
import { Pagination } from '@plone/volto/components';
import { getContentWithData } from '../actions';
import Filter from './Filter';

class BlockView extends Component {
  constructor(props) {
    super(props);

    this.loadContent = this.loadContent.bind(this);
    this.getRequestKey = this.getRequestKey.bind(this);
    this.filterItems = this.filterItems.bind(this);

    this.state = {
      results: [],
      activeFilter: null,
      currentPage: 0,
      pageSize: 1, // 15
      pageSizes: [1, 2], // [15, 30, 50],
      totalPages: 1,
    };

    this.onChangePage = this.onChangePage.bind(this);
    this.onChangePageSize = this.onChangePageSize.bind(this);
  }

  onChangePage(ev, { value }) {
    this.setState({ currentPage: value }, this.loadContent);
  }

  onChangePageSize(ev, { value }) {
    this.setState({ pageSize: value, currentPage: 0 }, this.loadContent);
  }

  getRequestKey() {
    return `col-content:${this.props.block}`;
  }

  loadContent() {
    const path = this.props.data.collection_url;
    if (!path) return;

    // NOTE: while this works, we needed a ton of overrides: override for
    // Collection behavior in eea.restapi and a new action, the
    // getContentWithData. I think this can be achieved by using the @search
    // endpoint, reading the collection query property and changing that, to
    // pass a custom query to the endpoint
    const url = `${getBaseUrl(path)}`;
    const options = {
      metadata_fields: '_all',
      // b_start: this.state.currentPage * this.state.pageSize,
      // b_size: this.state.pageSize,
      // custom_query: this.state.activeFilter
      //   ? [
      //       {
      //         i: this.props.index_name,
      //         o: 'plone.app.querystring.operation.any',
      //         v: this.state.activeFilter,
      //       },
      //     ]
      //   : [],
    };
    this.props.getContentWithData(url, null, this.getRequestKey(), options);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.collection_url !== this.props.data.collection_url) {
      return this.loadContent();
    }
    const key = this.getRequestKey();
    if (!prevProps.contentSubrequests[key]) {
      return;
    }

    const prev = prevProps.contentSubrequests[key];
    const now = this.props.contentSubrequests[key];
    const b_size = this.state.pageSize;
    const b_start = this.state.currentPage * b_size;
    const end = b_start + b_size;

    if (prev.loading && now.loaded) {
      this.setState({
        results: now.data.items.slice(b_start, end),
        totalPages: Math.ceil(now.data.items_total / this.state.pageSize),
      });
    }
  }

  componentDidMount() {
    this.loadContent();
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
        <Pagination
          current={this.state.currentPage}
          total={this.state.totalPages}
          pageSize={this.state.pageSize}
          pageSizes={this.state.pageSizes}
          onChangePage={this.onChangePage}
          onChangePageSize={this.onChangePageSize}
        />
        {this.props.data.index_name ? (
          <Filter
            handleSelectFilter={(ev, { name }) =>
              this.setState({ activeFilter: name })
            }
            index_name={this.props.data.index_name}
            selectedValue={this.state.activeFilter}
            results={this.state.results}
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
