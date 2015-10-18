request = require 'superagent'

module.exports = ($http)->
  templateUrl: '/views/series-list.html'
  restrict: 'E'
  link: (scope) ->
    scope.seriesList = []

    scope.showDeletableMsg = (index)->
      scope.seriesList[index].isShowMsg = true if scope.seriesList[index]

    scope.hiddenDeletableMsg = (index)->
      scope.seriesList[index].isShowMsg = false if scope.seriesList[index]

    scope.deleteSeries = (seriesKeyword, seriesIndex)->
      request.del('/api/user/series')
      .send(
        query: seriesKeyword
      ).end (err, ret) ->
        scope.seriesList = [] if err
        scope.seriesList = scope.seriesList.filter (series, index) -> series unless index == seriesIndex

    $http
      method: 'get'
      url: '/api/user/series'
    .then (ret) ->
      scope.seriesList = ret.data.seriesList
    .catch (err) ->
      scope.seriesList = []

    scope.$on 'registerSeries', (event, payload)-> scope.seriesList.unshift payload
