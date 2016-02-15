/** @jsx element */

import { dom } from 'deku';
import {
  createStore,
  applyMiddleware,
} from 'redux';
import createLogger from 'redux-logger';

import rootReducer from 'app/reducers/rootReducer';
import { IS_PRODUCTION } from 'app/utils';

const { createRenderer } = dom;

const store = createStore(
  rootReducer,
  IS_PRODUCTION ? undefined : applyMiddleware(createLogger())
);
const rootNode = document.getElementById('root');
const render = createRenderer(rootNode, store.dispatch);

export {
  render,
  store,
};
