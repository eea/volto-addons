import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPortlets } from '../actions';

export class PortletManagerRenderer extends Component {
  // constructor(props) {
  //   super(props);
  //
  //   // if (props.name) {
  //   //   console.log('constructor props', props);
  //   //   props.getPortlets(props.pathname, props.name);
  //   // }
  // }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState) {
    if (this.props.pathname && prevProps.pathname !== this.props.pathname) {
      // console.log('compdidupdate');
      this.props.getPortlets(this.props.pathname, this.props.name);
    }
  }

  render() {
    console.log('portlet props', this.props);
    const portlets = this.props.portletmanagers[this.props.name] || [];
    return (
      <div id={`portlets-${this.props.name}`}>
        portlets for {this.props.name}
        {portlets.map(portlet => (
          <div key={portlet['@id']}>{portlet['@id']}</div>
        ))}
      </div>
    );
  }
}

export default connect(
  (state, props) => ({
    portletmanagers: state.portlets.managers,
  }),
  {
    getPortlets,
  },
)(PortletManagerRenderer);
