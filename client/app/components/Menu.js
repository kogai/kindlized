/** @jsx element */

import { element } from 'deku';

const render = ({ props })=> (
  <li class={ props.isActive ? 'Menu-list active' : 'Menu-list' }>
    <a href={ props.link } class="Menu-list__link">
      <i class={ `fa fa-${props.icon} fa-fw` }></i>
      { props.name }
    </a>
  </li>
);

export default {
  render,
};
