import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPortlets } from '../actions';
import { portlets } from '~/config';

export function renderPortlet(portlet, props) {
  const PortletRenderer =
    portlets.renderers[portlet['@type']] || portlets.renderers.default;
  return <PortletRenderer portlet={portlet} {...props} />;
}

class PortletManagerRenderer extends Component {
  componentDidUpdate(prevProps, prevState) {
    if (this.props.pathname && prevProps.pathname !== this.props.pathname) {
      this.props.getPortlets(this.props.pathname, this.props.name);
    }
  }

  render() {
    const portlets = this.props.portletmanagers[this.props.name] || [];
    return (
      <div id={`portlets-${this.props.name}`}>
        {portlets.map(portlet => (
          <div className="portlet" key={portlet['@id']}>
            {renderPortlet(portlet)}
          </div>
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
