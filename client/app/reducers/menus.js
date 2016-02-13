const initialState = [
  {
    name: '書籍検索',
    link: '/',
    icon: 'search',
  },
  {
    name: 'シリーズ',
    link: '/series',
    icon: 'book',
  },
  {
    name: 'アカウント',
    link: '/account',
    icon: 'user',
  },
];

export default function menuReducer(state = initialState) {
  return state;
}
