import { connect } from 'react-redux';
import { getIndexValues } from '../actions';
import React, { Component } from 'react';

class FacetsConfigurationWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
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
  render() {
    console.log('props in widget', this.props);
    return <div>Hello</div>;
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
)(FacetsConfigurationWidget);
