import React from 'react';

const TilesListing = ({ items }) => {
  return (
    <div>
      {items.length
        ? items.map(item => (
            <div key={item['@id']}>
              <a href={item.url}>{item.title}</a>
            </div>
          ))
        : 'No results'}
    </div>
  );
};

export default TilesListing;
