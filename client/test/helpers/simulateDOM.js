/** @jsx element */

import { dom } from 'deku';
import {
  createStore,
  // applyMiddleware,
} from 'redux';
// import reduxThunk from 'redux-thunk';

import rootReducer from 'app/reducers/rootReducer';

const { createRenderer } = dom;

export function renderIntoDocument(instance) {
  const store = createStore(rootReducer);
  // const store = createStore(rootReducer, applyMiddleware(reduxThunk));
  const render = createRenderer(document.body, store.dispatch);
  return render(instance, store.getState());
}


export function createFakeEvent(type, target, value = '') {
  const EventInterface = [
    'type', 'currentTarget', 'eventPhase', 'bubbles',
    'cancelable', 'timeStamp', 'defaultPrevented', 'isTrusted',
  ];

  const nativeEvent = new Event(type);
  const mockEvent = {};
  EventInterface.forEach((key)=> mockEvent[key] = nativeEvent[key]);

  mockEvent.target = target;
  mockEvent.target.value = value;

  return nativeEvent;
}
