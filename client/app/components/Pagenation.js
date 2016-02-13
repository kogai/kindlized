/** @jsx element */

import { element } from 'deku';
import { objectToCss } from 'app/utils';

import { fetchBooks } from 'app/actionCreators/books';

const pagenationStyle = objectToCss({
  textAlign: 'center',
});

function render({ context, dispatch }) {
  return (
    <div style={ pagenationStyle }>
      <ul class="btn-group">
        {
          context.page.pagenation.map((p)=> (
            <li
              class={ p === context.page.currentPage ? 'btn btn-primary' : 'btn btn-default' }
              onClick={ fetchBooks(dispatch) }
              data-page={ p }
            >{ p }</li>
          ))
        }
      </ul>
    </div>
  );
}

export default {
  render,
};
