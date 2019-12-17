import { settings } from '~/config';

export function cleanUrl(url) {
  return (
    (url &&
      url
        .replace(settings.apiPath, '')
        .replace(settings.internalApiPath, '')) ||
    ''
  );
}
