import React from 'react';

export default (portlet, props) => {
  console.debug('volto-addons: No renderer found for portlet', portlet);
  return <div className="default-renderer-portlet" />;
};
