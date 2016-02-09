/** @jsx element */

import { element } from 'deku';

import { objectToCss } from 'app/utils';

const validationStyle = objectToCss({
  marginTop: '6px',
});

function render({ props }) {
  return (
    <div class="text-danger" style={ validationStyle }>
      { props.isValid ? '' : props.vaidateMessage }
    </div>
  );
}

export default {
  render,
};
