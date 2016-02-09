/** @jsx element */

import { element } from 'deku';

import Menu from 'app/components/Menu';

function render({ props, context }) {
  return (
    <ul class="nav nav-pills nav-stacked">
      {
        context.menus.map((m)=> <Menu
          isActive={ props.activePath === m.link }
          link={ m.link }
          name={ m.name }
          icon={ m.icon }
        />)
      }
    </ul>
  );
}

export default {
  render,
};
