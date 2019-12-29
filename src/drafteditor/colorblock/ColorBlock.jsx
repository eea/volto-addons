import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  blockProps: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  // theme: PropTypes.object.isRequired,
};

const ColorBlock = props => {
  const { blockProps, className } = props;
  const width = blockProps.width;

  return (
    <span
      style={{
        width,
        display: 'inline-block',
        backgroundColor: 'red',
        height: '30px',
      }}
      className={className}
    >
      {props.children}
    </span>
  );
};

ColorBlock.propTypes = propTypes;
ColorBlock.defaultProps = {
  className: null,
  entityKey: null,
  target: null,
};

export default ColorBlock;
