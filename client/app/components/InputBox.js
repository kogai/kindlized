/** @jsx element */

import { element } from 'deku';
import Validation from 'app/components/Validation';

function render({ props, dispatch }) {
  const inputValue = props.editable.textContainer;
  return (
    <section>
      <div class="input-group">
        <input
          class="form-control"
          onInput={ props.onInput(dispatch, props.editable, props.index) }
          type="text"
          value={ inputValue }
          placeholder={ props.placeholder }
        />
        <div class="input-group-btn">
          <button
            class={ `btn btn-default` }
            onClick={ props.onClick(dispatch, props.editable, props.index) }
            type="button"
          >
            <i class={ `fa fa-${props.icon} fa-fw` }></i>
            { props.name }
          </button>
        </div>
      </div>
      {
        props.validator ?
        <Validation
          isValid={ props.editable.isValid }
          vaidateMessage={ props.vaidateMessage }
        /> :
        ''
      }
    </section>
  );
}

export default {
  render,
};
