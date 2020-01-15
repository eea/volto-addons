import React, { Component } from 'react';
import { FormattedDate } from 'react-intl';
import { Item } from 'semantic-ui-react';
import { Breadcrumb, Placeholder } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { settings } from '~/config';

class TilesListing extends Component {
  getPath(url) {
    return url
      .replace(settings.apiPath, '')
      .replace(settings.internalApiPath, '');
  }

  render() {
    // const { items } = this.props;
    const searchItems = this.props.items?.sort(
      (a, b) => new Date(b.ModificationDate) - new Date(a.ModificationDate),
    );

    return searchItems.length ? (
      <Item.Group>
        {searchItems.map(item => (
          <Item className="item search-item" key={item['@id']}>
            {item.lead_image ? (
              <Item.Image
                size="tiny"
                src={`${item['@id']
                  .replace(settings.apiPath, '')
                  .replace(settings.internalApiPath, '')}/@@images/image/thumb`}
              />
            ) : (
              ''
            )}
            <Item.Content>
              <Item.Header>
                <Link to={item.url}>
                  <h3 className="item-title">{item.Title || item.title}</h3>
                </Link>
              </Item.Header>

              <Item.Description>
                <div className="descriptionBody">{item.description}</div>
                <div className="searchMetadata">
                  {item.topics && (
                    <div>
                      <span className="searchLabel black">Topic:</span>{' '}
                      {item.topics?.join(', ')}
                    </div>
                  )}
                  <div>
                    <span className="searchLabel black">Content type:</span>{' '}
                    {item['@type']}
                  </div>
                  <div>
                    <span className="searchLabel black">Updated:</span>{' '}
                    <FormattedDate
                      value={item.ModificationDate}
                      day="2-digit"
                      month="long"
                      year="numeric"
                    />
                  </div>
                  <div>
                    <span className="searchLabel black">Location:</span>{' '}
                    {item['@components'] && item['@components'].breadcrumbs && (
                      <Breadcrumb style={{ display: 'inline' }}>
                        {item['@components'].breadcrumbs.items
                          .slice(0, -1)
                          .map((item, index, items) => [
                            index < items.length - 1 ? (
                              <Breadcrumb.Section>
                                <Link
                                  key={item.url}
                                  to={this.getPath(item['@id'])}
                                >
                                  {item.title}
                                </Link>
                                <Breadcrumb.Divider
                                  key={`divider-${item.url}`}
                                />
                              </Breadcrumb.Section>
                            ) : (
                              <Breadcrumb.Section>
                                <Link
                                  key={item.url}
                                  to={this.getPath(item['@id'])}
                                >
                                  {item.title}
                                </Link>
                              </Breadcrumb.Section>
                            ),
                          ])}
                      </Breadcrumb>
                    )}
                  </div>
                </div>
              </Item.Description>
            </Item.Content>
          </Item>
        ))}
      </Item.Group>
    ) : (
      <div>
        <p>No results.</p>
        <Placeholder>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      </div>
    );
  }
}

export default TilesListing;
