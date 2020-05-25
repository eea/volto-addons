/**
 * Sidebar component.
 * @module components/manage/Sidebar/Sidebar
 *
 * Customizations:
 * - the removal of the Document tab in the sidebar.
 * - automatically toggle sidebar on edit tab switch (blocks -> metadata)
 */

import React, { Component, Fragment } from 'react';
import { Button, Tab } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import cookie from 'react-cookie';
import { defineMessages, injectIntl } from 'react-intl';
import cx from 'classnames';
import { BodyClass } from '@plone/volto/helpers';
import { Icon } from '@plone/volto/components';
import forbiddenSVG from '@plone/volto/icons/forbidden.svg';
import { setSidebarTab } from '@plone/volto/actions';

const messages = defineMessages({
  document: {
    id: 'Document',
    defaultMessage: 'Document',
  },
  block: {
    id: 'Block',
    defaultMessage: 'Block',
  },
});

/**
 * Sidebar container class.
 * @class Sidebar
 * @extends Component
 */
class Sidebar extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {};

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs Sidebar
   */
  constructor(props) {
    super(props);
    this.onToggleExpanded = this.onToggleExpanded.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.state = {
      // Changed from default volto, we always expand sidebar
      expanded: this.props.sidebarState, // cookie.load('sidebar_expanded') !== 'false',
    };
  }

  /**
   * On toggle expanded handler
   * @method onToggleExpanded
   * @returns {undefined}
   */
  onToggleExpanded() {
    cookie.save('sidebar_expanded', !this.state.expanded, {
      expires: new Date((2 ** 31 - 1) * 1000),
      path: '/',
    });
    this.setState({
      expanded: !this.state.expanded,
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.sidebarState !== prevProps.sidebarState) {
      this.setState({ expanded: this.props.sidebarState });
    }
  }

  /**
   * On tab change
   * @method onTabChange
   * @param {Object} event Event object
   * @param {Object} data Data object
   * @returns {undefined}
   */
  onTabChange(event, data) {
    this.props.setSidebarTab(data.activeIndex);
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    const { expanded } = this.state;

    return (
      <Fragment>
        <BodyClass
          className={expanded ? 'has-sidebar' : 'has-sidebar-collapsed'}
        />
        <div className={cx('sidebar-container', { collapsed: !expanded })}>
          <Button
            aria-label={expanded ? 'Shrink sidebar' : 'Expand sidebar'}
            className={
              this.props.content && this.props.content.review_state
                ? `${this.props.content.review_state} trigger`
                : 'trigger'
            }
            onClick={this.onToggleExpanded}
          />
          <Tab
            menu={{
              secondary: true,
              pointing: true,
              attached: true,
              tabular: true,
              className: 'formtabs',
            }}
            className="tabs-wrapper"
            renderActiveOnly={false}
            activeIndex={0}
            onTabChange={this.onTabChange}
            panes={[
              {
                menuItem: this.props.intl.formatMessage(messages.block),
                pane: (
                  <Tab.Pane
                    key="properties"
                    className="tab-wrapper"
                    id="sidebar-properties"
                    active={true}
                  >
                    <Icon
                      className="tab-forbidden"
                      name={forbiddenSVG}
                      size="48px"
                    />
                  </Tab.Pane>
                ),
              },
            ]}
          />
        </div>
        <div className={this.state.expanded ? 'pusher expanded' : 'pusher'} />
      </Fragment>
    );
  }
}

export default compose(
  injectIntl,
  connect(
    state => ({
      tab: state.sidebar.tab,
      sidebarState: state.sidebar_state.open,
    }),
    { setSidebarTab },
  ),
)(Sidebar);