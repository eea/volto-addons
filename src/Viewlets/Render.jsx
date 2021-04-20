import React from 'react';
import config from '@plone/volto/registry';
import { matchPath } from 'react-router';

export default (props) => {
  const { pathname } = props;
  const active = config.viewlets.filter((viewlet) =>
    matchPath(pathname, viewlet.path) ? true : false,
  );

  return active.map(({ component }, i) => {
    const Viewlet = component;
    return <Viewlet key={`viewlet-${i}`} />;
  });
};
