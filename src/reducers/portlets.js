import { GET_PORTLETS } from '../constants';

const initialState = {
  error: null,
  managers: {},
  loaded: false,
  loading: false,
};

/**
 * Data providers reducer.
 * @function mosaic_settings
 * @param {Object} state Current state.
 * @param {Object} action Action to be handled.
 * @returns {Object} New state.
 */
export default function portlets(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_PORTLETS}_PENDING`:
      return {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
    case `${GET_PORTLETS}_SUCCESS`:
      const managers = {
        ...state.managers,
      };
      if (action.subrequest) {
        managers[action.subrequest] = action.result.portlets || [];
      }
      return {
        ...state,
        error: null,
        managers,
        loaded: true,
        loading: false,
      };
    case `${GET_PORTLETS}_FAIL`:
      return {
        ...state,
        error: action.error,
        // items: [],
        // portlets: {},
        loaded: false,
        loading: false,
      };
    default:
      return state;
  }
}
