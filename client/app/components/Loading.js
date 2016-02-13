/** @jsx element */

import { element } from 'deku';
import { objectToCss } from 'app/utils';

const wrapStyle = objectToCss({
  textAlign: 'center',
});
const iconStyle = objectToCss({
  fontSize: '24px',
});

function render() {
  return (
    <div style={ wrapStyle }>
      <i class="fa fa-spinner fa-pulse" style={ iconStyle }></i>
    </div>
  );
}

export default {
  render,
};
