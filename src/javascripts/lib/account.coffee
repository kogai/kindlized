module.exports = ( $scope, $http, $window, account ) ->

	$scope.isSending = false
	$scope.statusMessage = '送信中...'
	$scope.isRegist = !true

	$scope.toggleBtn = () ->
		$scope.isRegist = !$scope.isRegist

	$scope.regist = ( mail, password ) ->
		$scope.isSending = true
		httpOpt =
			method   : 'post'
			url		 : '/account/regist'
			data	 : {
				mail: mail
				password: password
			}

		$http( httpOpt )
		.success ( statusMessage ) ->
			$scope.statusMessage = statusMessage
			return
		.then ->
			console.log '/account/regist 完了'
			return
		return

	$scope.login = ( mail, password ) ->
		$scope.isSending = true
		httpOpt =
			method   : 'post'
			url		 : '/account/login'
			data	 : {
				mail: mail
				password: password
			}

		$http( httpOpt )
		.success ( statusMessage ) ->
			$window.location.href = '/'

			# $http({
			# 	url: '/account/login/success'
			# })
			return
		.then ( statusMessage )->
			$scope.statusMessage = 'ログイン完了'
			console.log '/account/login 完了'
			return
			# return
		return

	$scope.logout = () ->
		$scope.isSending = true
		httpOpt =
			method : 'post'
			url		 : '/account/logout'

		$http( httpOpt )
		.success ( statusMessage ) ->
			$scope.statusMessage = statusMessage
			return
		.then ->
			console.log '/account/logout 完了'
			return
		return

	return
