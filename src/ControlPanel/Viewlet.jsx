import React, { Component } from 'react';
import { Segment } from 'semantic-ui-react';
import { getControlpanelFallbacks } from '../actions';
import { connect } from 'react-redux';

class Viewlet extends Component {
  componentDidMount() {
    this.props.getControlpanelFallbacks();
  }

  render() {
    return (
      <Segment.Group raised>
        <Segment className="primary">Fallback Plone administration</Segment>
        <Segment attached>
          <ul>
            {this.props.panels.map((panel, i) => (
              <li key={`panel-${i}`}>
                <a
                  href={panel['@id']}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {panel.title}
                </a>
              </li>
            ))}
          </ul>
        </Segment>
      </Segment.Group>
    );
  }
}

export default connect(
  (state, props) => ({
    panels: state.controlpanel_fallbacks.items,
  }),
  { getControlpanelFallbacks },
)(Viewlet);
