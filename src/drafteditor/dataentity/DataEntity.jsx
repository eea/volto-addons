import React from 'react';
import PropTypes from 'prop-types';
import 'draft-js-focus-plugin/lib/plugin.css';

const propTypes = {
  blockProps: PropTypes.object.isRequired,
  className: PropTypes.string,
  style: PropTypes.object,
  // theme: PropTypes.object.isRequired,
};

const DataEntity = props => {
  const { blockProps, className } = props;
  // const width = blockProps.width;

  return (
    <span
      style={{
        display: 'inline-block',
        backgroundColor: 'red',
        height: '30px',
        width: '30px',
      }}
      className={className}
    >
      {props.children}
    </span>
  );
};

DataEntity.propTypes = propTypes;
DataEntity.defaultProps = {
  className: null,
  entityKey: null,
  target: null,
};

export default DataEntity;
