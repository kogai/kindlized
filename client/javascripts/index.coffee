app = require('./controllers/app')
account = require('./controllers/account')
analytics = require('./controllers/analytics')
search = require('./controllers/search')
reload = require('./controllers/reload')
seriesList = require('./directives/series-list')

angular.module('App',[])
  .config([
    "$locationProvider",
    ($locationProvider) ->
      $locationProvider.html5Mode
        enabled: true
        requireBase: false
  ])
  .controller(
    'app',
    ['$scope', '$filter', '$http', '$rootScope', app]
  )
  .controller(
    'account',
    ['$scope', '$http', '$window', '$location', account]
  )
  .controller(
    'search',
    ['$scope', '$filter', '$http', search]
  )
  .controller(
    'reload',
    ['$scope', '$window', reload]
  )
  .directive('seriesList', seriesList)
