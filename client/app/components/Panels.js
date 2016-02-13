/** @jsx element */

import { element } from 'deku';

import { objectToCss } from 'app/utils';
import { fetchBooks } from 'app/actionCreators/books';

import Panel from 'app/components/Panel';

const pannelStyle = objectToCss({
  textAlign: 'center',
});

const buttonStyle = objectToCss({
  display: 'block',
  margin: '8px auto',
  width: '140px',
});

const titleStyle = objectToCss({
  height: '30px',
});

const pannelsStyle = objectToCss({
  boxSizing: 'border-box',
  width: '100%',
});

const imgStyle = objectToCss({
  display: 'block',
  height: '160px',
});

function onCreate({ dispatch, props }) {
  if (props.iterateTo === 'panels') {
    fetchBooks(dispatch)(1);
  }
}

function render({ props, context }) {
  const panels = context[props.iterateTo].books;
  return (
    <ul class="row" style={ pannelsStyle }>
      {
        panels.map((m)=> <Panel
          isKindlized={ m.isKindlized }
          isRegisterd={ m.isRegisterd }
          isLoading={ m.isLoading }
          url={ m.url }
          title={ m.title }
          imgSrc={ m.images }
          ASIN={ m.ASIN }
          _id={ m._id }
          titleStyle={ titleStyle }
          pannelStyle={ pannelStyle }
          buttonStyle={ buttonStyle }
          imgStyle={ imgStyle }
        />)
      }
    </ul>
  );
}

export default {
  onCreate,
  render,
};
