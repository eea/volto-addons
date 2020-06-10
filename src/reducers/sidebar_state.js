import { CHANGE_SIDEBAR_STATE } from '../constants';

const initialState = {
  open: false,
};

export default function drafteditor_refresh(state = initialState, action = {}) {
  switch (action.type) {
    case CHANGE_SIDEBAR_STATE:
      return {
        open: action.open,
      };
    default:
      return state;
  }
}
