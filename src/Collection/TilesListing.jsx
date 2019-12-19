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
    const { items } = this.props;

    return (
      <div>
        <div className="tile-listing">
          <Item.Group>
            {items.length ? (
              items.map(item => (
                <Item key={item['@id']}>
                  <Item.Content>
                    <Item.Header as="a" href={item.url}>
                      <h3 className="tile-title">{item.Title || item.title}</h3>
                    </Item.Header>
                    {item['@components'] && item['@components'].breadcrumbs && (
                      <Breadcrumb>
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
                    <Item.Description>{item.description}</Item.Description>
                    <Item.Extra>
                      <span className="muted">Updated:</span>
                      <FormattedDate
                        value={item.ModificationDate}
                        day="2-digit"
                        month="long"
                        year="numeric"
                      />
                    </Item.Extra>
                  </Item.Content>
                </Item>
              ))
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
            )}
          </Item.Group>
        </div>
      </div>
    );
  }
}

export default TilesListing;
