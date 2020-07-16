/**
 * Search widget component.
 * @module components/theme/SearchWidget/SearchWidget
 */

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';
import { compose } from 'redux';
import { PropTypes } from 'prop-types';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import qs from 'query-string';

import { Icon } from '@plone/volto/components';
import zoomSVG from '@plone/volto/icons/zoom.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

import {
  quickResetSearchContent,
  quickSearchContent,
} from '../../../../actions';

import { doesNodeContainClick } from 'semantic-ui-react/dist/commonjs/lib';
import Highlighter from 'react-highlight-words';

const messages = defineMessages({
  search: {
    id: 'Search',
    defaultMessage: 'Search',
  },
  searchSite: {
    id: 'Search Site',
    defaultMessage: 'Search Site',
  },
});

/**
 * SearchWidget component class.
 * @class SearchWidget
 * @extends Component
 */
class SearchWidget extends Component {
  /**
   * Property types.
   * @property {Object} propTypes Property types.
   * @static
   */
  static propTypes = {
    pathname: PropTypes.string.isRequired,
    quickResetSearchContent: PropTypes.func.isRequired,
    quickSearchContent: PropTypes.func.isRequired,
  };

  /**
   * Constructor
   * @method constructor
   * @param {Object} props Component properties
   * @constructs WysiwygEditor
   */
  constructor(props) {
    super(props);
    this.onChangeSection = this.onChangeSection.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChange = this.onChange.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.getPaths = this.getPaths.bind(this);
    this.state = {
      text: this.props.initialText || '',
      section: false,
      active: false,
    };
    this.linkFormContainer = React.createRef();
  }

  componentDidMount() {
    this.props.quickResetSearchContent();
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  handleClickOutside = e => {
    if (
      this.linkFormContainer.current &&
      doesNodeContainClick(this.linkFormContainer.current, e)
    ) {
      this.setState({ active: true });
    } else {
      this.setState({ active: false });
    }
  };

  onChange(event, { value }) {
    if (value && value !== '') {
      this.props.quickSearchContent('', {
        Title: `*${value}*`,
        path: this.props.searchingPath || this.props.path,
      });
    } else {
      this.props.quickResetSearchContent();
    }
    this.setState({ text: value });
  }

  /**
   * On change section
   * @method onChangeSection
   * @param {object} event Event object.
   * @param {bool} checked Section checked.
   * @returns {undefined}
   */
  onChangeSection(event, { checked }) {
    this.setState({
      section: checked,
    });
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location?.state?.text && this.props?.location?.state?.text) {
      if (prevProps.location.state.text !== this.props.location.state.text) {
        this.setState(
          {
            text: this.props?.location?.state?.text,
          },
          () => {
            const title = this.props.searchPageTitle
              ? `&title=${this.props.searchPageTitle}`
              : this.props.title
              ? `&title=${this.props.title}`
              : '';
            this.props.history.push({
              pathname: `/search`,
              search: `?SearchableText=${
                this.state.text
              }${this.getPaths()}${title}`,
              state: { text: this.state.text },
            });
          },
        );
      }
    }
  }

  /**
   * Submit handler
   * @method onSubmit
   * @param {event} event Event object.
   * @returns {undefined}
   */
  onSubmit(event) {
    const title = this.props.searchPageTitle
      ? `&title=${this.props.searchPageTitle}`
      : this.props.title
      ? `&title=${this.props.title}`
      : '';
    this.props.history.push({
      pathname: `/search`,
      search: `?SearchableText=${this.state.text}${this.getPaths()}${title}`,
      state: { text: this.state.text },
    });
    this.setState({ active: false });
    event && event.preventDefault();
  }

  onSelectItem(item) {
    this.setState(
      {
        text: item.title,
      },
      () => this.onSubmit(),
    );
    this.onClose();
  }

  onClose = () => {
    this.props.quickResetSearchContent();
    this.setState({ active: false });
  };

  getPaths() {
    let paths = '';
    if (this.props.searchingPath) {
      if (Array.isArray(this.props.searchingPath)) {
        this.props.searchingPath.forEach(path => {
          paths += `&path=${path}`;
        });
      } else {
        paths += `&path=${this.props.searchingPath}`;
      }
    } else if (this.props.path) {
      if (Array.isArray(this.props.path)) {
        this.props.path.forEach(path => {
          paths += `&path=${path}`;
        });
      } else {
        paths += `&path=${this.props.path}`;
      }
    }
    return paths;
  }

  /**
   * Render method.
   * @method render
   * @returns {string} Markup for the component.
   */
  render() {
    return (
      <div ref={this.linkFormContainer}>
        <Form
          className="searchform"
          autoComplete="off"
          action="/search"
          onSubmit={this.onSubmit}
        >
          <input
            autoComplete="false"
            name="hidden"
            type="text"
            style={{ display: 'none' }}
          />
          <Form.Field className="searchbox">
            <div style={{ width: '100%', position: 'relative' }}>
              <Icon name={zoomSVG} size="26px" />
              <Input
                aria-label={this.props.intl.formatMessage(messages.search)}
                onChange={this.onChange}
                name="SearchableText"
                value={this.state.text}
                transparent
                placeholder={this.props.intl.formatMessage(messages.searchSite)}
                title={this.props.intl.formatMessage(messages.search)}
              />
              {this.state.text.length ? (
                <Icon
                  className="clear"
                  name={clearSVG}
                  size="26px"
                  onClick={() => {
                    this.setState({
                      text: '',
                    });
                    this.onClose();
                  }}
                />
              ) : (
                ''
              )}
              {this.state.active &&
              this.props.search &&
              this.props.search.length ? (
                <ul className="floating_search_results">
                  {this.props.search.map((item, index) => (
                    <li
                      key={`${index}_${item.title}`}
                      onClick={() => this.onSelectItem(item)}
                      role="presentation"
                    >
                      <Highlighter
                        highlightClassName="highlight"
                        searchWords={this.state.text?.split(' ') || []}
                        autoEscape={true}
                        textToHighlight={item.title}
                      />
                    </li>
                  ))}
                </ul>
              ) : (
                ''
              )}
            </div>
            <button aria-label={this.props.intl.formatMessage(messages.search)}>
              SEARCH
            </button>
          </Form.Field>
        </Form>
      </div>
    );
  }
}

export default compose(
  withRouter,
  injectIntl,
  connect(
    (state, props) => ({
      search: state.quicksearch.items,
      path: qs.parse(props.location.search).path,
      title: qs.parse(props.location.search).title,
    }),
    { quickResetSearchContent, quickSearchContent },
  ),
)(SearchWidget);
