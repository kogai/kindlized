module.exports = {
	search: {
		db: require('routes/api/search/Mongo'),
		amazon: require('routes/api/search/Amazon')
	},
	save: {
		series: require('routes/api/save/Series')
	}
};
