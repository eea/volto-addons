import { compact, concat, isArray, join, map, pickBy, toPairs } from 'lodash';

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
