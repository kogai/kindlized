import 'whatwg-fetch';
import validator from 'validator';

import {
  LOG_OUT, EMAIL_RECIEVE,
  EMAIL_INPUT, EMAIL_MODIFY,
} from 'app/actionCreators/actionTypes';

export const logout = (dispatch)=> ()=> {
  fetch(`/account/logout`, {
    method: 'POST',
    credentials: 'include',
  })
  .then(()=> dispatch({
    type: LOG_OUT,
  }))
  .catch((error)=> console.log(error));
};

export const emailFetch = (dispatch)=> ()=> {
  fetch(`/api/user/account?props=mail`, {
    credentials: 'include',
  })
  .then((res)=> res.json())
  .then((json)=> (dispatch({
    type: EMAIL_RECIEVE,
    body: {
      mailAddress: json.mail,
    },
  })))
  .catch((err)=> console.log(err));
};

export const emailInput = (dispatch)=> (ev)=> {
  const inputValue = ev.target.value;
  dispatch({
    type: EMAIL_INPUT,
    body: {
      textContainer: inputValue,
      isValid: validator.isEmail(inputValue),
    },
  });
};

export const emailClick = (dispatch, editable)=> ()=> {
  if (!editable.isValid) {
    return;
  }

  fetch(`/api/user/account`, {
    method: 'PUT',
    credentials: 'include',
    body: JSON.stringify({
      property: 'mail',
      data: editable.textContainer,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(()=> dispatch({
    type: EMAIL_MODIFY,
  }))
  .catch((err)=> console.log(err));
};
