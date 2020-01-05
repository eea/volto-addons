import { FORCE_DRAFT_EDITOR_REFRESH } from '../constants';
import { v4 as uuid } from 'uuid';

const initialState = {
  key: '',
};

export default function drafteditor_refresh(state = initialState, action = {}) {
  // console.log('reducing', action.type);
  switch (action.type) {
    case `${FORCE_DRAFT_EDITOR_REFRESH}`:
      return {
        draftKey: uuid(),
      };
    default:
      return state;
  }
}
