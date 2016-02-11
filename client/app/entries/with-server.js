/** @jsx element */

import { element } from 'deku';

import Header from 'app/components/Header';

import {
  render,
  store,
} from 'app/index';

function main() {
  render(
    <Header />,
    store.getState()
  );
}

main();
store.subscribe(main);
