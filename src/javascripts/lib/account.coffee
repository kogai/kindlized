module.exports = ( $scope, $http, account ) ->

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
			$scope.statusMessage = statusMessage
			return
		.then ->
			console.log '/account/login 完了'
			return
		return

	return
