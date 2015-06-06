app = require('./lib/app')
account = require('./lib/account')
analytics = require('./lib/analytics')
intro = require('./lib/intro')
author = require('./lib/author')
search = require('./lib/search')
reload = require('./lib/reload')

angular.module('App',[])
	.config([
		"$locationProvider",
		($locationProvider) ->
			$locationProvider.html5Mode(
				enabled: true
				requireBase: false
			)
	])
	.controller(
		'postNewBook',
		[ '$scope', '$filter', '$http', app ]
	)
	.controller(
		'account',
		[ '$scope', '$http', '$window', '$location', account ]
	)
	.controller(
		'intro',
		[ '$scope', '$http', '$window', intro ]
	)
	.controller(
		'author',
		[ '$scope', '$http', '$http', author ]
	)
	.controller(
		'search',
		[ '$scope', '$filter', '$http', search ]
	)
	.controller(
		'reload',
		[ '$scope', '$window', reload ]
	)
