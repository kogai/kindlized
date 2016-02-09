import 'whatwg-fetch';

import { SEARCH_INPUT, SEARCH_CLICK, SEARCH_RECIEVE } from 'app/actionCreators/actionTypes';

function requestPromise(endpoint, input, dispatch) {
  return new Promise((resolve, reject)=> {
    fetch(`/api/search/${endpoint}?query=${input}`, {
      credentials: 'include',
    })
    .then((res)=> res.json())
    .then((json)=> resolve(dispatch({
      type: SEARCH_RECIEVE,
      books: json,
    })))
    .catch((err)=> reject(err));
  });
}

export const searchClick = (dispatch, editable)=> ()=> {
  dispatch({
    type: SEARCH_CLICK,
  });

  Promise.all([
    requestPromise('db', editable.body, dispatch),
    requestPromise('amazon', editable.body, dispatch),
  ])
  .then((actions)=> console.log(actions))
  .catch((err)=> console.log(err));
};

export const searchInput = (dispatch)=> (ev)=> {
  dispatch({
    type: SEARCH_INPUT,
    body: ev.target.value,
  });
};
