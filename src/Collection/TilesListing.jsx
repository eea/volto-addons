import React from 'react';

const TilesListing = ({ items }) => {
  return (
    <div>
      {items.map(item => (
        <div key={item['@id']}>
          <a href={item.url}>{item.title}</a>
        </div>
      ))}
    </div>
  );
};

export default TilesListing;
