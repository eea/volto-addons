/**
 * Add container.
 * @module components/manage/Add/Add
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from '@plone/volto/helpers';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { keys } from 'lodash';
import { defineMessages, injectIntl } from 'react-intl';
import { Button } from 'semantic-ui-react';
import { Portal } from 'react-portal';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import { v4 as uuid } from 'uuid';
import qs from 'query-string';
import { settings } from '~/config';
import { toast } from 'react-toastify';

import { createContent, getSchema } from '@plone/volto/actions';
import { Form, Icon, Toolbar, Sidebar, Toast } from '@plone/volto/components';
import {
  getBaseUrl,
  hasBlocksData,
  getBlocksFieldname,
  getBlocksLayoutFieldname,
} from '@plone/volto/helpers';

import { blocks } from '~/config';

import saveSVG from '@plone/volto/icons/save.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

import { getEditForm } from 'volto-addons/helpers';
import { Tab } from 'semantic-ui-react';

const messages = defineMessages({
  add: {
    id: 'Add {type}',
    defaultMessage: 'Add {type}',
  },
  save: {
    id: 'Save',
    defaultMessage: 'Save',
  },
  cancel: {
    id: 'Cancel',
    defaultMessage: 'Cancel',
  },
  error: {
    id: 'Error',
    defaultMessage: 'Error',
  },
});

/**
 * Add class.
 * @class Add
 * @extends Component
 */
class Add extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    createContent: PropTypes.func.isRequired,
    getSchema: PropTypes.func.isRequired,
    pathname: PropTypes.string.isRequired,
    schema: PropTypes.objectOf(PropTypes.any),
    content: PropTypes.shape({
      // eslint-disable-line react/no-unused-prop-types
      '@id': PropTypes.string,
      '@type': PropTypes.string,
    }),
    returnUrl: PropTypes.string,
    createRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    schemaRequest: PropTypes.shape({
      loading: PropTypes.bool,
      loaded: PropTypes.bool,
    }).isRequired,
    type: PropTypes.string,
    location: PropTypes.objectOf(PropTypes.any),
  };

  /**
   * Default properties
   * @property {Object} defaultProps Default properties.
   * @static
   */
  static defaultProps = {
    schema: null,
    content: null,
    returnUrl: null,
    type: 'Default',
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onTabChange = this.onTabChange.bind(this);
    this.state = {
      currentTab: 0,
    };

    if (blocks?.initialBlocks[props.type]) {
      this.initialBlocksLayout = blocks.initialBlocks[props.type].map((item) =>
        uuid(),
      );
      this.initialBlocks = this.initialBlocksLayout.reduce(
        (acc, value, index) => ({
          ...acc,
          [value]: { '@type': blocks.initialBlocks[props.type][index] },
        }),
        {},
      );
    }
  }

  onTabChange(event, { activeIndex }) {
    this.setState({ currentTab: activeIndex });
  }

  /**
   * Component did mount
   * @method componentDidMount
   * @returns {undefined}
   */
  componentDidMount() {
    this.props.getSchema(this.props.type);
  }

  /**
   * Component will receive props
   * @method componentWillReceiveProps
   * @param {Object} nextProps Next properties
   * @returns {undefined}
   */
  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      this.props.createRequest.loading &&
      nextProps.createRequest.loaded &&
      nextProps.content['@type'] === this.props.type
    ) {
      this.props.history.push(
        this.props.returnUrl ||
          nextProps.content['@id'].replace(settings.apiPath, ''),
      );
    }

    if (nextProps.createRequest.error) {
      toast.error(
        <Toast
          error
          title={this.props.intl.formatMessage(messages.error)}
          content={`${nextProps.createRequest.error.status}:  ${nextProps.createRequest.error.response?.body?.message}`}
        />,
      );
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {object} data Form data.
   * @returns {undefined}
   */
  onSubmit(data) {
    this.props.createContent(getBaseUrl(this.props.pathname), {
      ...data,
      '@static_behaviors': this.props.schema.definitions
        ? keys(this.props.schema.definitions)
        : null,
      '@type': this.props.type,
      ...(settings.isMultilingual &&
        this.props.location?.state?.translationOf && {
          translation_of: this.props.location.state.translationOf,
          language: this.props.location.state.language,
        }),
    });
  }

  /**
   * Cancel handler
   * @method onCancel
   * @returns {undefined}
   */
  onCancel() {
    this.props.history.push(getBaseUrl(this.props.pathname));
  }

  form = React.createRef();

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    if (this.props.schemaRequest.loaded) {
      const FormImpl = getEditForm(this.props, 'add') || Form;
      const visual = hasBlocksData(this.props.schema.properties);
      return (
        <div id="page-add">
          <Helmet
            title={this.props.intl.formatMessage(messages.add, {
              type: this.props.type,
            })}
          />
          {visual ? (
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
              activeIndex={this.props.tab}
              onTabChange={this.onTabChange}
              panes={[
                {
                  menuItem: 'Blocks',
                  pane: (
                    <Tab.Pane
                      key="visual"
                      className="tab-wrapper"
                      id="visual-form"
                    >
                      <FormImpl
                        ref={this.form}
                        schema={this.props.schema}
                        formData={{
                          [getBlocksFieldname(
                            this.props.schema.properties,
                          )]: null,
                          [getBlocksLayoutFieldname(
                            this.props.schema.properties,
                          )]: null,
                        }}
                        onSubmit={this.onSubmit}
                        hideActions
                        pathname={this.props.pathname}
                        visual={visual}
                        title={this.props.intl.formatMessage(messages.add, {
                          type: this.props.type,
                        })}
                        loading={this.props.createRequest.loading}
                        mode="addform"
                      />
                    </Tab.Pane>
                  ),
                },
                {
                  menuItem: 'Metadata',
                  pane: (
                    <Tab.Pane
                      key="metadata"
                      className="tab-wrapper"
                      id="sidebar-metadata"
                    />
                  ),
                },
              ]}
            />
          ) : (
            <FormImpl
              ref={this.form}
              schema={this.props.schema}
              formData={{
                [getBlocksFieldname(this.props.schema.properties)]: null,
                [getBlocksLayoutFieldname(this.props.schema.properties)]: null,
              }}
              onSubmit={this.onSubmit}
              hideActions
              pathname={this.props.pathname}
              visual={visual}
              title={this.props.intl.formatMessage(messages.add, {
                type: this.props.type,
              })}
              loading={this.props.createRequest.loading}
              mode="addform"
            />
          )}
          <Portal node={__CLIENT__ && document.getElementById('toolbar')}>
            <Toolbar
              pathname={this.props.pathname}
              hideDefaultViewButtons
              inner={
                <>
                  <Button
                    id="toolbar-save"
                    className="save"
                    aria-label={this.props.intl.formatMessage(messages.save)}
                    onClick={() => this.form.current.onSubmit()}
                    loading={this.props.createRequest.loading}
                  >
                    <Icon
                      name={saveSVG}
                      className="circled"
                      size="30px"
                      title={this.props.intl.formatMessage(messages.save)}
                    />
                  </Button>
                  <Button className="cancel" onClick={() => this.onCancel()}>
                    <Icon
                      name={clearSVG}
                      className="circled"
                      aria-label={this.props.intl.formatMessage(
                        messages.cancel,
                      )}
                      size="30px"
                      title={this.props.intl.formatMessage(messages.cancel)}
                    />
                  </Button>
                </>
              }
            />
          </Portal>
          {visual && this.state.currentTab === 0 && (
            <Portal node={__CLIENT__ && document.getElementById('sidebar')}>
              <Sidebar />
            </Portal>
          )}
        </div>
      );
    }
    return <div />;
  }
}

export default compose(
  DragDropContext(HTML5Backend),
  injectIntl,
  connect(
    (state, props) => ({
      createRequest: state.content.create,
      schemaRequest: state.schema,
      content: state.content.data,
      schema: state.schema.schema,
      pathname: props.location.pathname,
      returnUrl: qs.parse(props.location.search).return_url,
      type: qs.parse(props.location.search).type,
    }),
    { createContent, getSchema },
  ),
)(Add);