import 'whatwg-fetch';

import {
  SERIES_INPUT, SERIES_CLICK,
  SERIES_REGISTER, SERIES_UN_REGISTER,
  SERIES_FETCH, SERIES_RECIEVE,
  SERIES_TOGGLE,
  SERIES_EDIT_CLICK, SERIES_EDIT_INPUT,
} from 'app/actionCreators/actionTypes';

export const fetchSeries = (dispatch)=> ()=> {
  dispatch({
    type: SERIES_FETCH,
  });

  fetch('/api/user/series', {
    credentials: 'include',
  })
  .then((res)=> res.json())
  .then((json)=> dispatch({
    type: SERIES_RECIEVE,
    body: json.seriesList,
  }))
  .catch((err)=> console.log(err));
};

export const inputAddSeries = (dispatch)=> (ev)=> {
  dispatch({
    type: SERIES_INPUT,
    body: ev.target.value,
  });
};

export const addSeries = (dispatch, editable)=> ()=> {
  dispatch({
    type: SERIES_CLICK,
  });

  fetch('/api/user/series', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify({ query: editable.body }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res)=> res.json())
  .then((json)=> dispatch({
    type: SERIES_REGISTER,
    body: {
      books: json.series,
      message: json.message,
    },
  }))
  .catch((err)=> console.log(err));
};

export const toggleSeries = (dispatch, series)=> ()=> {
  dispatch({
    type: SERIES_TOGGLE,
    body: {
      books: series,
    },
  });
};

export const inputEditSeries = (dispatch, editable, index)=> (ev)=> {
  dispatch({
    type: SERIES_EDIT_INPUT,
    body: {
      textContainer: ev.target.value,
      index,
    },
  });
};

export const editSeries = (dispatch, editable, index)=> ()=> {
  dispatch({
    type: SERIES_EDIT_CLICK,
    body: {
      index,
    },
  });

  fetch(`/api/user/series`, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify(editable),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res)=> res.json())
  .then((json)=> dispatch({
    type: SERIES_RECIEVE,
    body: json,
  }))
  .catch((err)=> console.log(err));
};

export const deleteSeries = (dispatch, series)=> ()=> {
  fetch(`/api/user/series`, {
    method: 'DELETE',
    credentials: 'include',
    body: JSON.stringify({ query: series.name }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(()=> dispatch({
    type: SERIES_UN_REGISTER,
    body: {
      books: series,
    },
  }))
  .catch((err)=> console.log(err));
};
