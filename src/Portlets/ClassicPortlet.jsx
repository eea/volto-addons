import React from 'react';

export default ({ portlet }) => {
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: portlet.classicportlet || '',
      }}
    />
  );
};
