/** @jsx element */

import assert from 'power-assert';
import sinon from 'sinon';
import { element } from 'deku';

import { renderIntoDocument, createFakeEvent } from 'test/helpers/simulateDOM';
import InputBox from 'app/components/InputBox';
import { searchClick, searchInput } from 'app/actionCreators/search';

describe('Components: InputBox', ()=> {
  const iconTypeMock = 'edit';
  const nameMock = 'nameMock';
  let node, store, button, input, clickSpy, onInputSpy;
  beforeEach(()=> {
    clickSpy = sinon.spy(searchClick);
    onInputSpy = sinon.spy(searchInput);
    const root = renderIntoDocument(
      <InputBox
        name={ nameMock }
        editable={ {} }
        onClick={ clickSpy } onInput={ onInputSpy }
        type={ iconTypeMock }
        icon={ iconTypeMock }
      />
    );
    node = root.node;
    store = root.store;

    input = node.querySelector('input');
    button = node.querySelector('button');
  });

  it('Should: Render name prop', ()=> {
    assert(button.innerHTML.match(nameMock));
    assert(button.className.match('btn'));
  });

  it('Can: Fire Action with onClick', ()=> {
    button.click();
    assert(clickSpy.called);
  });

  it('Can: Input text', ()=> {
    const text = 'abcdef';
    const inputEvent = createFakeEvent('input', input, text);
    input.dispatchEvent(inputEvent);
    assert(onInputSpy.called);
  });

  it('Should: Reset inputed text when onClick called', ()=> {
    const text = 'abcdef';
    const inputEvent = createFakeEvent('input', input, text);
    input.dispatchEvent(inputEvent);
    assert(store.getState().search.body === 'abcdef');
    button.click();
    assert(store.getState().search.body === '');
  });

  /*
  it.only('Should: text inputed pass to onClick', ()=> {});
  */
});
