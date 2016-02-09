/** @jsx element */

import { element } from 'deku';

import { emailInput, emailClick } from 'app/actionCreators/account';
import { objectToCss } from 'app/utils';

import Layout from 'app/components/Layout';
import InputBox from 'app/components/InputBox';
import Account from 'app/components/Account';

import {
  render,
  store,
} from 'app/index';

const inputBoxStyle = objectToCss({
  margin: '20px 40px',
  marginBottom: '30px',
});

function main() {
  render(
    <Layout activePath="/account" >
      <div style={ inputBoxStyle }>
        <Account />
        <InputBox
          placeholder="通知用のメールアドレスを変更する"
          name="変更"
          editable={ store.getState().account }
          onClick={ emailClick } onInput={ emailInput }
          validator="isEmail"
          vaidateMessage="メールアドレスを入力して下さい"
          type="email"
          icon="edit"
        />
      </div>
    </Layout>,
    store.getState()
  );
}

main();
store.subscribe(main);
