/** @jsx element */

import { element } from 'deku';
import AccountButton from 'app/components/AccountButton';
import { inspectLoginState } from 'app/actionCreators/account';

function onCreate({ dispatch }) {
  inspectLoginState(dispatch)();
}

function render({ context }) {
  return (
    <header class="Header">
      <h1 class="Header__logo"><a href="/">Kindlized</a></h1>
      <span class="Header__discription">kindle化した書籍の通知サービス</span>
      <section class="Header-menu">
        <ul>
          <li class="Header-menu__list"><a href="https://twitter.com/iamchawan" target="_blank">お問い合わせ</a></li>
          {
            context.account.button
            .filter((m)=> m.isLogin === context.account.isLogin)
            .map((b)=> <AccountButton
              link={ b.link }
              methodName={ b.methodName }
              class={ b.class }
              name={ b.name }
            />)
          }
        </ul>
      </section>
    </header>
  );
}

export default {
  onCreate,
  render,
};
