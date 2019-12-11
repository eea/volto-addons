import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPortlets } from '../actions';

export class PortletManagerRenderer extends Component {
  constructor(props) {
    super(props);

    if (props.name) {
      console.log('constructor props', props);
      props.getPortlets(props.pathname, props.name);
    }
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.pathname !== this.props.pathname) {
      console.log('compdidupdate');
      this.props.getPortlets(this.props.pathname, this.props.name);
    }
  }

  render() {
    return <div id={`portlets-${this.props.name}`}>Hello</div>;
  }
}

export default connect(
  (state, props) => ({
    portlets: state.portlets.items || [],
  }),
  {
    getPortlets,
  },
)(PortletManagerRenderer);
