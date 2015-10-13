app = require('./lib/app')
account = require('./lib/account')
analytics = require('./lib/analytics')
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
    'app',
    [ '$scope', '$filter', '$http', app ]
  )
  .controller(
    'account',
    [ '$scope', '$http', '$window', '$location', account ]
  )
  .controller(
    'search',
    [ '$scope', '$filter', '$http', search ]
  )
  .controller(
    'reload',
    [ '$scope', '$window', reload ]
  )
