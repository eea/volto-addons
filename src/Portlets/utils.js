// TODO: rename as helpers.jsx

import React from 'react';
import { Grid } from 'semantic-ui-react';

import config from '@plone/volto/registry';

export default function renderPortletManager(name, cols, { ...props }) {
  let WrappedPortletManager =
    config.portlets.managers[name] || config.portlets.managers.default;
  return cols ? (
    <Grid.Column
      mobile={12}
      tablet={12}
      largeScreen={3}
      computer={2}
      widescreen={3}
    >
      <WrappedPortletManager name={name} {...props} />
    </Grid.Column>
  ) : (
    <WrappedPortletManager name={name} {...props} />
  );
}

export function normalize(str) {
  return str && str.replace(/\./g, '');
}
