import { connect } from 'react-redux';
import { Portal } from 'react-portal';
import React, { Component } from 'react';
import { getIndexValues } from '../actions';
import { Menu, Label } from 'semantic-ui-react';
import { Button } from 'semantic-ui-react';

class Filter extends Component {
  componentDidMount() {
    if (this.props.index_name) {
      this.props.getIndexValues(this.props.index_name);
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.index_name !== prevProps.index_name) {
      this.props.getIndexValues(this.props.index_name);
    }
  }

  computeStats(filters, results, fieldname) {
    const res = {};
    filters.forEach(f => {
      res[f] = 0;
    });
    results.forEach(item => {
      filters.forEach(f => {
        if (item[fieldname] && item[fieldname].indexOf(f) > -1) {
          res[f] += 1;
        }
      });
    });
    return res;
  }

  render() {
    const stats = this.computeStats(
      this.props.filters,
      this.props.results,
      this.props.index_name,
    );
    return __CLIENT__ &&
      this.props.index_name &&
      document.querySelector('.cols.content-cols .inPageNavigation') ? (
      <Portal
        node={
          __CLIENT__ &&
          document.querySelector('.cols.content-cols .inPageNavigation')
        }
      >
        <div className="headings_navigation">
          <h5>
            <b>Filter by {this.props.index_name}</b>
          </h5>
          <Menu vertical>
            {this.props.filters.map(item => (
              <Menu.Item
                key={item}
                name={item}
                onClick={this.props.handleSelectFilter}
                active={this.props.selectedValue === item}
              >
                <Label color="teal">{stats[item]}</Label>
                {item}
              </Menu.Item>
            ))}
          </Menu>
          {this.props.selectedValue ? (
            <Button
              onClick={() => this.props.handleSelectFilter(null, { name: '' })}
            >
              Clear
            </Button>
          ) : (
            ''
          )}
        </div>
      </Portal>
    ) : (
      ''
    );
  }
}

export default connect(
  (state, props) => {
    return {
      filters: (state.index_values && state.index_values.items) || [],
    };
  },
  {
    getIndexValues,
  },
)(Filter);
