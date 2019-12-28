import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  blockProps: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  // theme: PropTypes.object.isRequired,
};

const ColorBlock = props => {
  console.log('rendering colorblock', props);

  const { blockProps, className } = props;
  const width = blockProps.width;

  return (
    <div style={{ width }} className={className} rel="noopener noreferrer">
      - COLORBLOCK -
    </div>
  );
};

ColorBlock.propTypes = propTypes;
ColorBlock.defaultProps = {
  className: null,
  entityKey: null,
  target: null,
};
export default ColorBlock;
