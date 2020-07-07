import { GET_RESOURCES } from '../constants';

const initialState = {
  error: null,
  data: {},
  loaded: false,
  loading: false,
};

let newState;

export default function resources(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_RESOURCES}_PENDING`:
      newState = {
        ...state,
        error: null,
        loaded: false,
        loading: true,
      };
      if (!newState.data[action.dataType]) {
        newState.data[action.dataType] = {};
        newState.data[action.dataType].items = [];
        newState.data[action.dataType].items_total = 0;
      }
      return newState;

    case `${GET_RESOURCES}_SUCCESS`:
      newState = {
        ...state,
        error: null,
        loaded: true,
        loading: false,
      };
      newState.data[action.dataType].items = action.result.items;
      newState.data[action.dataType].items_total = action.result.items_total;
      return newState;
    case `${GET_RESOURCES}_FAIL`:
      newState = {
        ...state,
        error: action.error,
        loading: false,
        loaded: false,
      };
      newState.data[action.dataType].items = [];
      newState.data[action.dataType].items_total = 0;
      return newState;
    default:
      return state;
  }
}
