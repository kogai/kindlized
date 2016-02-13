/** @jsx element */

import assert from 'power-assert';
import sinon from 'sinon';
import { element } from 'deku';

import { renderIntoDocument, createFakeEvent } from 'test/helpers/simulateDOM';
import InputBox from 'app/components/InputBox';
import { editSeries, editInput } from 'app/actionCreators/edit';

describe('Components: InputBox', ()=> {
  const iconTypeMock = 'edit';
  const nameMock = 'nameMock';
  let node, button, input, clickSpy, onInputSpy;
  beforeEach(()=> {
    clickSpy = sinon.spy(editSeries);
    onInputSpy = sinon.spy(editInput);
    node = renderIntoDocument(
      <InputBox
        name={ nameMock }
        onClick={ clickSpy } onInput={ onInputSpy }
        type={ iconTypeMock }
      />
    );

    input = node.querySelector('input');
    button = node.querySelector('button');
  });

  it('Should render name prop', ()=> {
    assert(button.innerHTML.match(nameMock));
    assert(button.className.match('btn'));
  });

  it('Can fire Action with onClick', ()=> {
    button.click();
    assert(clickSpy.called);
  });

  it('Can Input text', ()=> {
    const text = 'abcdef';
    const inputEvent = createFakeEvent('input', input, text);
    input.dispatchEvent(inputEvent);
    assert(onInputSpy.called);
  });

  it.only('Should text inputed is delete when onClick called', ()=> {

  });

  /*
  it.only('Should text inputed pass to onClick', ()=> {});
  */
});
