import {
  GET_INDEX_VALUES,
  GET_CONTROLPANEL_FALLBACKS,
  CREATE_ATTACHMENT,
  GET_ALL_ATTACHMENTS,
  GET_ATTACHMENTS,
  DELETE_ATTACHMENT,
  UPDATE_ATTACHMENT,
  GET_PORTLETS,
} from './constants';
import { GET_CONTENT } from '@plone/volto/constants/ActionTypes';
import { dataToQueryString } from './helpers';
import { settings } from '~/config';

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
  const qs = dataToQueryString(data);
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

export function getControlpanelFallbacks() {
  return {
    type: GET_CONTROLPANEL_FALLBACKS,
    request: {
      op: 'get',
      path: '/@controlpanels-fallbacks',
    },
  };
}

export function createAttachment(url, content) {
  return {
    type: CREATE_ATTACHMENT,
    request: {
      op: 'post',
      path: url,
      data: content,
    },
  };
}

export function getAllAttachments(path) {
  return {
    type: GET_ALL_ATTACHMENTS,
    request: {
      op: 'get',
      path,
    },
  };
}

export function getAttachments(path, _type) {
  return {
    type: GET_ATTACHMENTS,
    request: {
      op: 'get',
      path,
      data: { container: _type },
    },
  };
}

export function deleteAttachment(path) {
  return {
    type: DELETE_ATTACHMENT,
    request: {
      op: 'del',
      path: path.replace(settings.apiPath, ''),
    },
  };
}

export function updateAttachment(path, data) {
  return {
    type: UPDATE_ATTACHMENT,
    request: {
      op: 'patch',
      path: path.replace(settings.apiPath, ''),
      data,
    },
  };
}

export function getPortlets(path, name) {
  const url = name ? `${path}/@portlets/${name}` : `${path}/@portlets`;
  return {
    type: GET_PORTLETS,
    subrequest: name,
    request: {
      op: 'get',
      path: url,
    },
  };
}
