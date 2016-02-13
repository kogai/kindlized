import 'whatwg-fetch';

import {
  EDIT_INPUT,
} from 'app/actionCreators/actionTypes';

export const editInput = (dispatch)=> (ev)=> {
  dispatch({
    type: EDIT_INPUT,
    body: ev.target.value,
  });
};
