import React from 'react';

import { portletManagers } from '~/config';

export default function renderPortletManager(name, { ...props }) {
  let WrappedPortletManager = portletManagers[name] || portletManagers.default;
  return <WrappedPortletManager name={name} {...props} />;
}
