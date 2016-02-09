/** @jsx element */

import { element } from 'deku';

const render = ({ props })=> (
  <li class={ props.isActive ? 'active' : null }>
    <a href={ props.link }>
      <i class={ `fa fa-${props.icon} fa-fw` }></i>
      { props.name }
    </a>
  </li>
);

export default {
  render,
};
