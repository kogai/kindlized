/** @jsx element */

import { element } from 'deku';
import { emailFetch } from 'app/actionCreators/account';

function onCreate({ dispatch }) {
  emailFetch(dispatch)();
}

function render({ context }) {
  return (
    <h4>{ `通知先メールアドレス: ${context.account.mailAddress}` }</h4>
  );
}

export default {
  onCreate,
  render,
};
