module.exports = ( $scope, $http, account ) ->
	$scope.isSending = false
	$scope.regist = ( mail, password ) ->
		$scope.statusMessage = '送信中...'
		$scope.isSending = true
		console.log 'mail', mail
		console.log 'password', password
		httpOpt =
			method   : 'post'
			url		 : '/account/regist'
			data	 : {
				mail: mail
				password: password
			}

		$http( httpOpt )
		.success ( statusMessage ) ->
			console.log 'success!'
			$scope.statusMessage = statusMessage
			return
		.then ->
			console.log '/account/regist 完了'
			return
		return
	return
