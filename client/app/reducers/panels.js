import {
  BOOK_FETCH, BOOK_RECIEVE,
  BOOK_REGISTER, BOOK_UN_REGISTER,
} from 'app/actionCreators/actionTypes';

const initialState = {
  books: [],
};

export default function panelReducer(state = initialState, action) {
  switch (action.type) {
    case BOOK_FETCH:
      return state;

    case BOOK_RECIEVE:
      return {
        books: action.body.books,
      };

    case BOOK_REGISTER:
      return {
        books: [].concat([action.body]).concat(state.books),
      };

    case BOOK_UN_REGISTER:
      return {
        books: state.books.filter((b)=> b._id !== action.body._id),
      };

    default:
      return state;
  }
}
