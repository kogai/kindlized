/** @jsx element */

import { element } from 'deku';
import { fetchBooks } from 'app/actionCreators/books';

function render({ context, dispatch }) {
  return (
    <div class="Pagenation">
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
