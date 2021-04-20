import config from '@plone/volto/registry';

export function cleanUrl(url) {
  return (
    (url &&
      url
        .replace(config.settings.apiPath, '')
        .replace(config.settings.internalApiPath, '')) ||
    ''
  );
}
