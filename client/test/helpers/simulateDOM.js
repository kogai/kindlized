/** @jsx element */

import { dom } from 'deku';
import {
  createStore,
} from 'redux';

import rootReducer from 'app/reducers/rootReducer';

const { createRenderer } = dom;

export function renderIntoDocument(instance) {
  const store = createStore(rootReducer);
  const render = createRenderer(document.body, store.dispatch);
  return {
    node: render(instance, store.getState()),
    store,
  };
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
