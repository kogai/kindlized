app = require('./lib/app')

angular.module('App',[ 'uiGmapgoogle-maps' ])
	.controller(
		'MainController',
		[ '$scope', '$filter', '$http', '$q', '$window', app ]
	)
