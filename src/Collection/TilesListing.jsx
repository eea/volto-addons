import React from 'react';
import { FormattedDate } from 'react-intl';
import { Item } from 'semantic-ui-react';

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
                    <Item.Description>{item.description}</Item.Description>
                    <Item.Extra>
                      <span>
                        Content Type:{' '}
                        <span style={categoryStyle}>{item['@type']}</span>
                      </span>
                      <span>
                        Date:{' '}
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
