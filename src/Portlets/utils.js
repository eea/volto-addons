import React from 'react';

import { portlets } from '~/config';

export default function renderPortletManager(name, { ...props }) {
  let WrappedPortletManager =
    portlets.managers[name] || portlets.managers.default;
  return <WrappedPortletManager name={name} {...props} />;
}
