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

  computeStats() {
    const filters = this.props.filters;
    const results = this.props.results;
    const index_name = this.props.index_name;

    if (!results) return [];

    const res = {};
    filters.forEach(f => {
      res[f] = 0;
    });
    results.forEach(item => {
      filters.forEach(f => {
        if (item[index_name] && item[index_name].indexOf(f) > -1) {
          res[f] += 1;
        }
      });
    });
    return res;
  }

  render() {
    const stats = this.computeStats();
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
                onClick={(ev, { name }) =>
                  this.props.handleSelectFilter(ev, {
                    index_name: this.props.index_name,
                    selected: name,
                  })
                }
                active={this.props.selectedValue === item}
              >
                <Label color="teal">{stats[item]}</Label>
                {item}
              </Menu.Item>
            ))}
          </Menu>
          {this.props.selectedValue ? (
            <Button
              onClick={() =>
                this.props.handleSelectFilter(null, {
                  index_name: this.props.index_name,
                  selected: null,
                })
              }
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
