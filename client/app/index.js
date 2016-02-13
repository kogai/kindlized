/** @jsx element */

import { dom } from 'deku';
import {
  createStore,
  applyMiddleware,
} from 'redux';
// import reduxThunk from 'redux-thunk';
import createLogger from 'redux-logger';

import rootReducer from 'app/reducers/rootReducer';

const { createRenderer } = dom;

const store = createStore(rootReducer, applyMiddleware(createLogger()));
const rootNode = document.getElementById('root');
const render = createRenderer(rootNode, store.dispatch);

export {
  render,
  store,
};
