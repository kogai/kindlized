/** @jsx element */

import { element } from 'deku';

import { objectToCss } from 'app/utils';
import Header from 'app/components/Header';
import Menus from 'app/components/Menus';

const containerStyle = objectToCss({
  display: 'flex',
});

const navStyle = objectToCss({
  width: '15%',
});

const articleStyle = objectToCss({
  padding: '0 20px',
  width: '85%',
});

function render({ props, children }) {
  return (
    <div>
      <Header />
      <section style={ containerStyle }>
        <nav style={ navStyle }>
          <Menus activePath={ props.activePath } />
        </nav>
        <article style={ articleStyle }>
          { children }
        </article>
      </section>
    </div>
  );
}

export default {
  render,
};
