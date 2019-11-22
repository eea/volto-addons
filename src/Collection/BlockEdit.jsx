import TilesListing from './TilesListing';
import navTreeSVG from '@plone/volto/icons/nav.svg';
import clearSVG from '@plone/volto/icons/clear.svg';
import { Segment } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { SidebarPortal } from '@plone/volto/components';
import { TextWidget } from '@plone/volto/components';
import { connect } from 'react-redux';
import { getBaseUrl } from '@plone/volto/helpers';
import { getContent } from '@plone/volto/actions';

class Edit extends Component {
  constructor(props) {
    super(props);

    this.updateContent = this.updateContent.bind(this);
    this.getRequestKey = this.getRequestKey.bind(this);

    this.state = {
      items: [],
    };
  }

  getRequestKey() {
    return `col-content:${this.props.block}`;
  }

  updateContent() {
    const path = this.props.data.collection_url;
    if (!path) return;

    const url = `${getBaseUrl(path)}`;
    this.props.getContent(url, null, this.getRequestKey());
  }

  componentDidUpdate(prevProps) {
    if (prevProps.data.collection_url !== this.props.data.collection_url) {
      return this.updateContent();
    }
    const key = this.getRequestKey();
    if (!prevProps.contentSubrequests[key]) {
      return;
    }

    const prev = prevProps.contentSubrequests[key];
    const now = this.props.contentSubrequests[key];

    if (prev.loading && now.loaded) {
      this.setState({ items: now.data.items });
    }
  }

  componentDidMount() {
    this.updateContent();
  }

  render() {
    const data = {
      ...this.props.data,
      collection_url: this.props.data.collection_url || '',
    };

    return (
      <div>
        {data.collection_url ? (
          <div>
            <TilesListing items={this.state.items} />
          </div>
        ) : (
          <strong>
            Use the right sidebar block editor to pick a collection.
          </strong>
        )}

        <SidebarPortal selected={this.props.selected}>
          <Segment.Group raised>
            <header className="header pulled">
              <h2>Collection</h2>
            </header>
            <Segment>
              <TextWidget
                id="sparqlquery"
                title="Query"
                required={false}
                value={data.collection_url.split('/').slice(-1)[0]}
                icon={data.collection_url ? clearSVG : navTreeSVG}
                iconAction={
                  data.collection_url
                    ? () => {
                        this.props.onChangeBlock(this.props.block, {
                          ...data,
                          collection_url: data.href,
                        });
                      }
                    : () =>
                        this.props.openObjectBrowser({
                          dataName: 'collection_url',
                          mode: 'link',
                        })
                }
                onChange={(name, value) => {
                  this.props.onChangeBlock(this.props.block, {
                    ...data,
                    collection_url: value,
                  });
                }}
              />
            </Segment>
          </Segment.Group>
        </SidebarPortal>
      </div>
    );
  }
}

/**
 * Property types.
 * @property {Object} propTypes Property types.
 * @static
 */
Edit.propTypes = {
  data: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default connect(
  (state, props) => ({
    contentSubrequests: state.content.subrequests,
  }),
  {
    getContent,
  },
)(Edit);
