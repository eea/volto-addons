import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import TilesListing from './TilesListing';
import { getBaseUrl } from '@plone/volto/helpers';
import { Pagination } from '@plone/volto/components';
import { getContentWithData } from '../actions';
import Filter from './Filter';

function filterResults(results = [], filterFor, facets = []) {
  if (!(filterFor && facets.length)) return results;

  return results.filter(obj =>
    obj[index_name].indexOf(filterFor) > -1 ? true : false,
  );
}

class BlockView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      results: [], // paged results to show in the listing
      all_items: [], // all items retrieved from backend
      filteredResults: [], // all items filtered by active filter
      activeFilters: [], // choice to filter, made in filter
      currentPage: 0, // current pagination page
      pageSize: 15, // how many items in a page
      pageSizes: [15, 30, 50], // choose between these page sizes
      totalPages: 0, // needed info for the pagination widget
      facetValues: {},
    };

    this.getRequestKey = this.getRequestKey.bind(this);
    this.handleSelectFilter = this.handleSelectFilter.bind(this);
    this.loadContent = this.loadContent.bind(this);
    this.onChangePage = this.onChangePage.bind(this);
    this.onChangePageSize = this.onChangePageSize.bind(this);
  }

  handleSelectFilter(ev, { index_name, selected }) {
    const filteredResults = filterResults(
      this.state.all_items,
      name,
      this.props.data.facets,
    );

    this.setState({
      activeFilter: name,
      filteredResults,
      currentPage: 0,
      results: filteredResults.slice(0, this.state.pageSize),
      totalPages: Math.ceil(filteredResults.length / this.state.pageSize),
    });
  }

  onChangePage(ev, { value }) {
    const b_size = this.state.pageSize;
    const b_start = value * b_size;
    const end = b_start + b_size;

    this.setState({
      currentPage: value,
      results: this.state.filteredResults.slice(b_start, end),
    });
  }

  onChangePageSize(ev, { value }) {
    const b_size = value;
    const b_start = 0;
    const end = b_start + b_size;
    this.setState({
      pageSize: value,
      currentPage: 0,
      results: this.state.filteredResults.slice(b_start, end),
      totalPages: Math.ceil(this.state.filteredResults.length / value),
    });
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

    if (prev.loading && now.loaded) {
      // now.data.items_total
      const filteredResults = filterResults(
        now.data.items,
        this.state.activeFilter,
        this.props.data.facets,
      );
      const b_size = this.state.pageSize;
      const b_start = this.state.currentPage * b_size;
      const end = b_start + b_size;
      this.setState({
        all_items: now.data.items,
        filteredResults,
        results: filteredResults.slice(b_start, end),
        totalPages: Math.ceil(filteredResults.length / this.state.pageSize),
      });
      return;
    }
  }

  componentDidMount() {
    this.loadContent();
  }

  render() {
    return this.state.results ? (
      <div>
        <TilesListing items={this.state.results} />
        <Pagination
          current={this.state.currentPage}
          total={this.state.totalPages}
          pageSize={this.state.pageSize}
          pageSizes={this.state.pageSizes}
          onChangePage={this.onChangePage}
          onChangePageSize={this.onChangePageSize}
        />
        {this.props.data.facets.map(index_name => (
          <Filter
            handleSelectFilter={this.handleSelectFilter}
            index_name={index_name}
            selectedValue={this.state.activeFilter}
            results={this.state.all_items}
          />
        ))}
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
