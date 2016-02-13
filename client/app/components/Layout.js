/** @jsx element */

import { element } from 'deku';

import Header from 'app/components/Header';
import Menus from 'app/components/Menus';

function render({ props, children }) {
  return (
    <div>
      <Header />
      <section class="Layout">
        <nav class="Layout__nav">
          <Menus activePath={ props.activePath } />
        </nav>
        <article class="Layout__article">
          { children }
        </article>
      </section>
    </div>
  );
}

export default {
  render,
};
