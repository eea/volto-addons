import React, { Component } from 'react';
import TableauReport from './TableauReport';

class TableauBlockView extends Component {
  constructor(props) {
    super(props);

    let data = this.props.data || {};
    let filters =
      data.filters && data.sheetname ? data.filters[data.sheetname] : {};
    this.state = {
      url: data.url || '',
      sheetname: data.sheetname || '',
      filters: filters,
    };
  }

  componentDidUpdate(prevProps) {
    if(prevProps.data?.url !== this.props.data?.url) {
      this.setState({...this.props.data})
    }
  }

  render() {
    if (__SERVER__) return '';
    console.log('state in tableau', this.state);
    return (
      <div
        className="chartWrapperView"
        style={{ width: '100%', overflowX: 'auto' }}
      >
        {this.state.url ? (
          <TableauReport
            url={this.state.url}
            filters={this.state.filters}
            sheetname={this.state.sheetname}
          />
        ) : (
          <div>Invalid or missing data.</div>
        )}
      </div>
    );
  }
}

export default TableauBlockView;
