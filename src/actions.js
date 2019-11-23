import { GET_INDEX_VALUES } from './constants';
import { GET_CONTENT } from '@plone/volto/constants/ActionTypes';

export function getIndexValues(name) {
  return {
    type: GET_INDEX_VALUES,
    request: {
      op: 'post',
      path: '/@index-values',
      data: { name },
    },
  };
}

export function getContentWithData(
  url,
  version = null,
  subrequest = null,
  data = {},
) {
  const qs = Object.keys(data)
    .map(key => key + '=' + data[key])
    .join('&');
  return {
    type: GET_CONTENT,
    subrequest,
    request: {
      op: 'get',
      path: `${url}${version ? `/@history/${version}` : ''}?fullobjects${
        data ? '&' + qs : ''
      }`,
      data,
    },
  };
}
