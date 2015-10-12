export default {
  search: {
    db: require('routes/api/search/Mongo'),
    amazon: require('routes/api/search/Amazon'),
  },
  user: {
    account: require('routes/api/user/account'),
    series: require('routes/api/user/series'),
    book: require('routes/api/user/book'),
    page: require('routes/api/user/page'),
  },
};
