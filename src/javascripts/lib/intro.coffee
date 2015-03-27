module.exports = ( $scope, $http, $window ) ->
	$scope.books = []
	httpOpt =
		method : 'get'
		url	 : '/book/intro'

	$http( httpOpt )
	.success ( books ) ->
		$scope.books = books
		return
	return
