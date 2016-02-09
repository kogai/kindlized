import {
  EDIT_INPUT, SERIES_EDIT_CLICK,
} from 'app/actionCreators/actionTypes';

const initialState = {
  body: '',
};

export default function editReducer(state = initialState, action) {
  switch (action.type) {
    case EDIT_INPUT:
      return {
        body: action.body,
      };
    case SERIES_EDIT_CLICK:
      return {
        body: '',
      };
    default:
      return state;
  }
}
