// TODO: rename as helpers.jsx

import React from 'react';
import { Grid } from 'semantic-ui-react';

import { portlets } from '~/config';

export default function renderPortletManager(name, cols, { ...props }) {
  let WrappedPortletManager =
    portlets.managers[name] || portlets.managers.default;
  return cols ? (
    <Grid.Column width={cols}>
      <WrappedPortletManager name={name} {...props} />
    </Grid.Column>
  ) : (
    <WrappedPortletManager name={name} {...props} />
  );
}

export function normalize(str) {
  return str && str.replace(/\./g, '');
}
