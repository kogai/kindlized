module.exports = {
	search: {
		db: require('routes/api/search/Mongo'),
		amazon: require('routes/api/search/Amazon')
	},
	user: {
		series: require('routes/api/user/Series'),
		book: require('routes/api/user/Book')
	}
};
