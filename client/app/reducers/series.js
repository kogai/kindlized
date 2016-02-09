import {
  SERIES_INPUT, SERIES_CLICK,
  SERIES_REGISTER, SERIES_UN_REGISTER,
  SERIES_FETCH, SERIES_RECIEVE,
  SERIES_TOGGLE,
  SERIES_EDIT_CLICK, SERIES_EDIT_INPUT,
} from 'app/actionCreators/actionTypes';

const initialState = {
  body: '',
  books: [],
  message: '',
};

export default function seriesReducer(state = initialState, action) {
  switch (action.type) {
    case SERIES_FETCH:
      return state;

    case SERIES_RECIEVE:
      return {
        body: state.body,
        books: action.body.map((s)=> Object.assign({}, s, { isEditing: false, textContainer: '' })),
        message: state.message,
      };

    case SERIES_INPUT:
      return {
        body: action.body,
        books: state.books,
        message: initialState.message,
      };

    case SERIES_CLICK:
      return {
        body: initialState.body,
        books: state.books,
        message: initialState.message,
      };

    case SERIES_REGISTER:
      return {
        body: state.body,
        books: action.body.books.seriesKeyword ?
          [].concat([action.body.books]).concat(state.books) :
          state.books,
        message: action.body.message,
      };

    case SERIES_UN_REGISTER:
      return {
        body: state.body,
        books: state.books.filter((b)=> b.seriesKeyword !== action.body.books.name),
        message: initialState.message,
      };

    case SERIES_TOGGLE:
      return {
        body: state.body,
        books: state.books
          .map((b)=> b.seriesKeyword === action.body.books.name ?
          Object.assign({}, b, { isEditing: true, textContainer: b.seriesKeyword }) : b),
        message: state.message,
      };

    case SERIES_EDIT_INPUT:
      return {
        body: state.body,
        books: state.books.map((b, i)=> (
          i === action.body.index ?
          Object.assign({}, b, { textContainer: action.body.textContainer }) : b
        )),
        message: state.message,
      };

    case SERIES_EDIT_CLICK:
      return {
        body: state.body,
        books: state.books.map((b, i)=> (
          i === action.body.index ?
          Object.assign({}, b, { isEditing: false }) : b
        )),
        message: state.message,
      };

    default:
      return state;
  }
}
