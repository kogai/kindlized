import 'whatwg-fetch';

import {
  BOOK_FETCH, BOOK_RECIEVE,
  BOOK_REGISTER, BOOK_UN_REGISTER,
} from './actionTypes';

export const fetchBooks = (dispatch)=> (page)=> {
  dispatch({
    type: BOOK_FETCH,
  });

  const fetchPage = typeof page === 'number' ? page : Number(page.target.dataset.page);
  fetch(`/api/user/book?page=${fetchPage}`, {
    credentials: 'include',
  })
  .then((res)=> res.json())
  .then((json)=> (dispatch({
    type: BOOK_RECIEVE,
    body: {
      books: json.books,
      maxCount: json.maxCount,
      currentPage: fetchPage,
    },
  })))
  .catch((err)=> console.log(err));
};

export const registerBook = (dispatch, book)=> ()=> {
  fetch('/api/user/book', {
    method: 'POST',
    credentials: 'include',
    body: JSON.stringify(book),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then((res)=> res.json())
  .then((json)=> dispatch({
    type: BOOK_REGISTER,
    body: json.book,
  }))
  .catch((err)=> console.log(err));
};

export const unRegisterBook = (dispatch, book)=> ()=> {
  fetch(`/api/user/book?_id=${book._id}`, {
    method: 'DELETE',
    credentials: 'include',
  })
  .then(()=> dispatch({
    type: BOOK_UN_REGISTER,
    body: book,
  }))
  .catch((err)=> console.log(err));
};
