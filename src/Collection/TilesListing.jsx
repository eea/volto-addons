import PropTypes from 'prop-types';
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

TilesListing.propTypes = {
  items: PropTypes.objectOf(PropTypes.any).isRequired,
};

export default TilesListing;
