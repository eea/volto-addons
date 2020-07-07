import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Input } from 'semantic-ui-react';
import { compose } from 'redux';
import { defineMessages, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import qs from 'query-string';

import { Icon } from '@plone/volto/components';
import zoomSVG from '@plone/volto/icons/zoom.svg';
import clearSVG from '@plone/volto/icons/clear.svg';

import { settings } from '~/config';
import { quickResetSearchContent, quickSearchContent } from '../actions';

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
 * View search block component.
 * @class View
 * @extends Component
 */
class View extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      apiRoot: new URL(settings.apiPath).pathname,
      active: false,
    };
    this.linkFormContainer = React.createRef();
    this.onSubmit = this.onSubmit.bind(this);
    this.handleClickOutside = this.handleClickOutside.bind(this);
    this.onSelectItem = this.onSelectItem.bind(this);
    this.onClose = this.onClose.bind(this);
    this.onChange = this.onChange.bind(this);
    this.getPaths = this.getPaths.bind(this);
  }

  componentDidMount() {
    this.props.quickResetSearchContent();
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.location?.state?.text && this.props?.location?.state?.text) {
      if (prevProps.location.state.text !== this.props.location.state.text) {
        this.setState(
          {
            text: this.props?.location?.state?.text,
          },
          () => {
            const title = this.props.data?.title
              ? `&title=${this.props.data.title.value}`
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

  onSubmit(event) {
    const title = this.props.data?.title
      ? `&title=${this.props.data.title.value}`
      : '';
    this.props.history.push({
      pathname: `/search`,
      search: `?SearchableText=${this.state.text}${this.getPaths()}${title}`,
      state: { text: this.state.text },
    });
    this.setState({ active: false });
    event && event.preventDefault();
  }

  handleClickOutside(e) {
    if (
      this.linkFormContainer.current &&
      doesNodeContainClick(this.linkFormContainer.current, e)
    ) {
      this.setState({ active: true });
    } else {
      this.setState({ active: false });
    }
  }

  onChange(event, { value }) {
    if (value && value !== '') {
      this.props.quickSearchContent('', {
        Title: `*${value}*`,
        path: this.props.data?.paths?.value,
      });
    } else {
      this.props.quickResetSearchContent();
    }
    this.setState({ text: value });
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

  onClose() {
    this.props.quickResetSearchContent();
    this.setState({ active: false });
  }

  getPaths() {
    let paths = '';
    if (this.props.data?.paths) {
      if (Array.isArray(this.props.data?.paths?.value)) {
        this.props.data.paths.value.forEach(path => {
          paths += `&path=${path}`;
        });
      } else {
        paths += `&path=${this.props.data.paths.value}`;
      }
    }
    return paths;
  }

  render() {
    return (
      <div ref={this.linkFormContainer}>
        <Form
          className="searchform"
          autoComplete="off"
          action="/search"
          onSubmit={this.onSubmit}
        >
          <Form.Field className="searchbox">
            <div
              style={{
                width: '100%',
                position: 'relative',
                marginRight: this.props.data?.searchButton?.value
                  ? '1rem'
                  : '0',
              }}
            >
              <Icon name={zoomSVG} size="26px" />
              <Input
                aria-label={this.props.intl.formatMessage(messages.search)}
                placeholder={
                  this.props.data?.placeholder?.value ||
                  this.props.intl.formatMessage(messages.searchSite)
                }
                title={this.props.intl.formatMessage(messages.search)}
                onChange={this.onChange}
                value={this.state.text}
                name="SearchableText"
                transparent
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
            {this.props.data?.searchButton?.value ? (
              <button
                aria-label={this.props.intl.formatMessage(messages.search)}
                className={this.props.data?.buttonClassName?.value}
              >
                {this.props.data?.buttonText?.value}
              </button>
            ) : (
              ''
            )}
          </Form.Field>
        </Form>
      </div>
    );
  }
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
View.propTypes = {
  //   data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default compose(
  withRouter,
  injectIntl,
  connect(
    (state, props) => ({
      search: state.quicksearch.items,
      path: qs.parse(props.location.search).path,
    }),
    { quickResetSearchContent, quickSearchContent },
  ),
)(View);
