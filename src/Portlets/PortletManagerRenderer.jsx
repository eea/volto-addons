import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getPortlets } from '../actions';
import config from '@plone/volto/registry';
import { normalize } from './utils';
import { getBaseUrl } from '@plone/volto/helpers';

export function renderPortlet(portlet, props) {
  const PortletRenderer =
    config.portlets.renderers[portlet['@type']] ||
    config.portlets.renderers.default;
  return <PortletRenderer portlet={portlet} {...props} />;
}

class PortletManagerRenderer extends Component {
  componentDidUpdate(prevProps, prevState) {
    const url = getBaseUrl(this.props.pathname || '');
    const prevUrl = getBaseUrl(prevProps.pathname || '');
    if (this.props.pathname && prevUrl !== url) {
      this.props.getPortlets(url, this.props.name);
    }
  }

  render() {
    const portlets = this.props.portletmanagers[this.props.name] || [];
    return (
      <div id={`portlets-${normalize(this.props.name)}`}>
        {portlets.map((portlet) => (
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
