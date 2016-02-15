import assert from 'power-assert';

import searchReducer from 'app/reducers/search';
import { SEARCH_RECIEVE } from 'app/actionCreators/actionTypes';

describe('Reducers: search', ()=> {
  describe.only('When: SEARCH_RECIEVE', ()=> {
    it('should: Loading state is end', ()=> {
      const s = searchReducer(undefined, { type: SEARCH_RECIEVE, books: [] });
      assert(s.isLoading === false);
    });

    it.only('should: duplicated books will be ignore', ()=> {
      const s1 = searchReducer(undefined, { type: SEARCH_RECIEVE, books: [{ title: 'FOO' }] });
      const s = searchReducer(s1, { type: SEARCH_RECIEVE, books: [{ title: 'FOO' }] });
      assert(s.books.length === 1);
    });
  });
});
