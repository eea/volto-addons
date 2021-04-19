/**
 * Search reducer.
 * @module reducers/search/search
 */

import { map, omit } from 'lodash';
import config from '@plone/volto/registry';

import { QUICK_RESET_SEARCH_CONTENT, QUICK_SEARCH_CONTENT } from '../constants';

const initialState = {
  error: null,
  items: [],
  total: 0,
  loaded: false,
  loading: false,
  batching: {},
  subrequests: {},
};

/**
 * Search reducer.
 * @function search
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function search(state = initialState, action = {}) {
  switch (action.type) {
    case `${QUICK_SEARCH_CONTENT}_PENDING`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                ...(state.subrequests[action.subrequest] || {
                  items: [],
                  total: 0,
                  batching: {},
                }),
                error: null,
                loaded: false,
                loading: true,
              },
            },
          }
        : {
            ...state,
            error: null,
            loading: true,
            loaded: false,
          };
    case `${QUICK_SEARCH_CONTENT}_SUCCESS`:
      const items = action.result.items.filter((item) => {
        item['@id'] = item['@id'].replace(config.settings.apiPath, '');
        let ok = true;
        action.filters &&
          Object.entries(action.filters).forEach(([filterKey, filter]) => {
            if (!filter.includes(item[filterKey])) {
              ok = false;
            }
          });
        return ok;
      });
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                error: null,
                items: items,
                total: action.result.items_total,
                loaded: true,
                loading: false,
                batching: { ...action.result.batching },
              },
            },
          }
        : {
            ...state,
            error: null,
            items: items,
            total: action.result.items_total,
            loaded: true,
            loading: false,
            batching: { ...action.result.batching },
          };
    case `${QUICK_SEARCH_CONTENT}_FAIL`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                error: action.error,
                items: [],
                total: 0,
                loading: false,
                loaded: false,
                batching: {},
              },
            },
          }
        : {
            ...state,
            error: action.error,
            items: [],
            total: 0,
            loading: false,
            loaded: false,
            batching: {},
          };
    case QUICK_RESET_SEARCH_CONTENT:
      return action.subrequest
        ? {
            ...state,
            subrequests: omit(state.subrequests, [action.subrequest]),
          }
        : {
            ...state,
            error: null,
            items: [],
            total: 0,
            loading: false,
            loaded: false,
            batching: {},
          };
    default:
      return state;
  }
}
