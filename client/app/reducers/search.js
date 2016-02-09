import { SEARCH_INPUT, SEARCH_CLICK, SEARCH_RECIEVE } from 'app/actionCreators/actionTypes';

const initialState = {
  body: '',
  books: [],
  isLoading: false,
};

export default function searchReducer(state = initialState, action) {
  switch (action.type) {
    case SEARCH_INPUT:
      return {
        body: action.body,
        books: state.books,
        isLoading: state.isLoading,
      };
    case SEARCH_CLICK:
      return {
        body: initialState.body,
        books: initialState.books,
        isLoading: true,
      };
    case SEARCH_RECIEVE:
      return {
        body: state.body,
        books: state.books.concat(action.books)
          .map((b)=> (Object.assign({}, b, {
            isRegisterd: true,
          }))),
        isLoading: initialState.isLoading,
      };
    default:
      return state;
  }
}
