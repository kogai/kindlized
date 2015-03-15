module.exports = ( $scope, $filter, $http ) ->
	httpOpt =
		method  	: 'get'
		url	 	: '/book'
	$http( httpOpt )
	.success ( bookListInDB, status ) ->
		$scope.bookListInDB = bookListInDB
	.then ->
		return

	httpOpt =
		method  : 'get'
		url	 : '/book/user'
	$http( httpOpt )
	.success ( bookListInUser, status, header, config ) ->
		$scope.bookListInUser = bookListInUser
		return
	.then ()->
		console.log '/book/user 完了'
		return

	$scope.searchBook = ->
		console.log $scope.newBook, 'postAuthor clicked'
		$scope.isNotExistenceBook   	= false
		$scope.isBookAdded		  		= false
		$scope.showSuggestedBooks   	= false
		$scope.isWaiting					= true

		httpOpt =
			method  : 'post'
			url	 : '/search'
			data	: { newBook: $scope.newBook }

		$http( httpOpt )
		.success ( data, status ) ->
			$scope.isNotExistenceBook   	= data.isNotExistenceBook
			$scope.showSuggestedBooks   	= true
			$scope.bookListInAmazon	 		= data.bookListInAmazon
			$scope.isWaiting					= false
			return
		.then ->
			console.log 'author saved.'
			# $scope.newBook = ''
			return

		return

	$scope.registBook = ( newBook ) ->
		console.log newBook
		httpOpt =
			method  : 'post'
			url	 : '/save'
			data	: { newBook: newBook }

		$http( httpOpt )
		.success ( data, status ) ->
			console.log 'registBook satatus is', status
			return
		.then ->
			console.log 'author saved.'
			$scope.newBook = ''
			return
		return
	return
