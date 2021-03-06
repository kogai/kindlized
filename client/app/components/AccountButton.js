/** @jsx element */

import { element } from 'deku';
import { logout } from 'app/actionCreators/account';

function render({ dispatch, props }) {
  return (
    <li class="Header-menu__list">
    {
      props.methodName ? (
        <button onClick={ logout(dispatch) } class={ `btn btn-${props.class}` }>
          { props.name }
        </button>
      ) : (
        <a href={ props.link } class={ `btn btn-${props.class}` }>
          { props.name }
        </a>
      )
    }
    </li>
  );
}

export default {
  render,
};
