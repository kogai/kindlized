/** @jsx element */

import { element } from 'deku';
import AccountButton from 'app/components/AccountButton';
import { objectToCss } from 'app/utils';
import { logout } from 'app/actionCreators/account';

const headerStyle = objectToCss({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
});

const logoStyle = objectToCss({
  fontSize: '30px',
  fontFamily: '"Pacifico",cursive',
  margin: 0,
  marginRight: '10px',
});

const discriptionStyle = objectToCss({
  display: 'inline-block',
  fontSize: '12px',
  color: '#666',
});

const menuStyle = objectToCss({
  flex: 2,
  textAlign: 'right',
  paddingRight: '10px',
});

const listStyle = objectToCss({
  display: 'inline-block',
  marginLeft: '10px',
});

function render({ context }) {
  return (
    <header style={ headerStyle }>
      <h1 style={ logoStyle }><a href="/">Kindlized</a></h1>
      <span style={ discriptionStyle }>kindle化した書籍の通知サービス</span>
      <section style={ menuStyle }>
        <ul>
          <li style={ listStyle }><a href="https://twitter.com/iamchawan" target="_blank">お問い合わせ</a></li>
          {
            context.account.button
            .filter((m)=> m.isLogin === context.account.isLogin)
            .map((b)=> <AccountButton
              link={ b.link }
              methodName={ b.methodName }
              class={ b.class }
              name={ b.name }
              style={ listStyle }
            />)
          }
        </ul>
      </section>
    </header>
  );
}

export default {
  render,
};
