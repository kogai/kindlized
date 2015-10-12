module.exports = ( $scope, $filter, $http ) ->

  $scope.registBook = ( ASIN ) ->
    httpOpt =
      method : 'post'
      url   : '/api/user/book'
      data  : {
        ASIN: ASIN
        isAuthorPage: true
      }

    console.log "httpOpt", httpOpt

    $http( httpOpt )
    .success ( data, status ) ->
      return
    .then ->
      return
    return
