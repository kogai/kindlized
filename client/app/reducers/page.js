import range from 'lodash.range';
import { BOOK_FETCH, BOOK_RECIEVE } from 'app/actionCreators/actionTypes';

const initialState = {
  pagenation: [],
  currentPage: 1,
};

export default function pageReducer(state = initialState, action) {
  switch (action.type) {
    case BOOK_FETCH:
      return state;

    case BOOK_RECIEVE:
      return {
        pagenation: range(Math.ceil(action.body.maxCount / 10)).map((p)=> (p + 1)),
        currentPage: action.body.currentPage || 1,
      };

    default:
      return state;
  }
}
