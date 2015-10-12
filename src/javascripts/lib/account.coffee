module.exports = ( $scope, $http, $window, $location ) ->

  $scope.isSending = false
  $scope.statusMessage = '送信中...'
  if($location.search()['ASIN'])
    $scope.isRegist = true
  else
    $scope.isRegist = false

  $scope.toggleBtn = () ->
    $scope.isRegist = !$scope.isRegist

  $scope.regist = (mail, password) ->
    $scope.isSending = true
    httpOpt =
      method: 'post'
      url: '/account/regist'
      data: {
        mail: mail
        password: password
      }

    $http(httpOpt)
    .success (statusMessage) ->
      $scope.statusMessage = statusMessage
      return
    return

  $scope.login = ( mail, password ) ->
    $scope.isSending = true
    httpOpt =
      method : 'post'
      url : '/account/login'
      data : {
        mail: mail
        password: password
      }

    $http( httpOpt )
    .success ( statusMessage ) ->
      $window.location.href = '/'
      return
    .then ( statusMessage )->
      $scope.statusMessage = 'ログイン完了'
      return
    return

  $scope.logout = () ->
    $scope.isSending = true
    httpOpt =
      method : 'post'
      url : '/account/logout'

    $http( httpOpt )
    .success ( statusMessage ) ->
      $scope.statusMessage = statusMessage
      $window.location.href = '/account'
      return
    .then ->
      console.log '/account/logout 完了'
      return
    return

  return
