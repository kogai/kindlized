const assert = require('power-assert');
const mock = {
  mock: {
    mock: true,
  },
};

describe('Test', ()=> {
  it('Should work', ()=> {
    assert(mock.mock.mock === true);
  });
});
