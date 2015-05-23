module.exports = ( $scope, $filter, $http ) ->

	$scope.registBook = ( ASIN ) ->
		console.log "ASIN", ASIN
		# httpOpt =
		# 	method : 'post'
		# 	url	 : '/save'
		# 	data	: {
		# 		ASIN: ASIN
		# 		isAuthorPage: true
		# 	}
		# console.log "httpOpt", httpOpt
		#
		# $http( httpOpt )
		# .success ( data, status ) ->
		# 	return
		# .then ->
		# 	return
		# return
