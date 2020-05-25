import redraft from 'redraft';
import { compact, concat, isArray, join, map, pickBy, toPairs } from 'lodash';
import { settings, editForms } from '~/config';
const url = require('url');

// NOTE: this needs to be improvded to recursively convert the query to qs
// Right now it fails on a query such as:
// {custom_query: [{o:'any', i: 'portal_type', v: 'Document'}]}

export function dataToQueryString(data) {
  let queryArray = [];
  const arrayOptions = pickBy(data, item => isArray(item));

  queryArray = concat(
    queryArray,
    data
      ? join(
          map(toPairs(pickBy(data, item => !isArray(item))), item => {
            if (item[0] === 'SearchableText') {
              // Adds the wildcard to the SearchableText param
              item[1] = `${item[1]}*`;
            }
            return join(item, '=');
          }),
          '&',
        )
      : '',
  );

  queryArray = concat(
    queryArray,
    arrayOptions
      ? join(
          map(pickBy(arrayOptions), (item, key) =>
            join(item.map(value => `${key}:list=${value}`), '&'),
          ),
          '&',
        )
      : '',
  );

  const querystring = join(compact(queryArray), '&');
  return querystring;
}

// if URL matches a defined cors proxy destination, then use the cors proxy
export function useCorsproxy(targetUrl) {
  console.log('using cors proxy', targetUrl);
  const allowed_cors_destinations = settings.allowed_cors_destinations || [];
  const parsed = url.parse(targetUrl);
  const nextUrl =
    allowed_cors_destinations.indexOf(parsed.host) === -1
      ? targetUrl
      : `/cors-proxy/${targetUrl}`;
  console.log('url is', nextUrl, parsed.host, allowed_cors_destinations);
  return nextUrl;
}

export function renderDraft(draftValue) {
  return draftValue
    ? redraft(draftValue, settings.ToHTMLRenderers, settings.ToHTMLOptions)
    : '';
}

function getByType(props, type) {
  let res;
  switch (type) {
    case 'edit':
      res = props.content['@type'];
      break;
    case 'add':
      res = props.type;
      break;
    default:
      res = props.content['@type'];
  }
  return editForms.byType[res];
}

function getByLayout(props, type) {
  console.log(editForms)
  return type === 'edit' ? editForms.byLayout[props.content.layout] : null;
}

export function getEditForm(props, type = 'edit') {
  const impl =
    getByLayout(props, type) || getByType(props, type) || editForms.default;

  return impl;
}
