import React from 'react';
import { FormattedDate } from 'react-intl';
import { Item } from 'semantic-ui-react';
import { Breadcrumb } from 'semantic-ui-react';
import { Link } from 'react-router-dom';

const TilesListing = ({ items }) => {
  const categoryStyle = {
    color: '#252525',
  };
  const segmentStyle = {
    marginBottom: '1rem',
  };

  return (
    <div>
      <div style={segmentStyle}>
        <Item.Group>
          {items.length
            ? items.map(item => (
                <Item key={item['@id']}>
                  <Item.Content>
                    <Item.Header as="a" href={item.url}>
                      {item.Title || item.title}
                    </Item.Header>
                    {item['@components'] && item['@components'].breadcrumbs && (
                      <div className="card-content">
                        <Breadcrumb>
                          {item['@components'].breadcrumbs.items
                            .slice(0, -1)
                            .map((item, index, items) => [
                              index < items.length - 1 ? (
                                <Breadcrumb.Section key={item['@id']}>
                                  <Link to={item['@id']}>{item.title}</Link>
                                  <Breadcrumb.Divider
                                    key={`divider-${item.url}`}
                                  />
                                </Breadcrumb.Section>
                              ) : (
                                <Breadcrumb.Section key={item['@id']}>
                                  <Link to={item['@id']}>{item.title}</Link>
                                </Breadcrumb.Section>
                              ),
                            ])}
                        </Breadcrumb>
                      </div>
                    )}
                    <Item.Description>{item.description}</Item.Description>
                    <Item.Extra>
                      <span>
                        Updated:{' '}
                        <span style={categoryStyle}>
                          <FormattedDate
                            value={item.created}
                            day="2-digit"
                            month="long"
                            year="numeric"
                          />
                        </span>
                      </span>
                    </Item.Extra>
                  </Item.Content>
                </Item>
              ))
            : 'No results'}
        </Item.Group>
      </div>
    </div>
  );
};

export default TilesListing;
