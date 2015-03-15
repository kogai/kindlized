module.exports = ( $scope, $filter, $http ) ->
	# httpOpt =
	# 	method  	: 'get'
	# 	url	 	: '/book'
	# $http( httpOpt )
	# .success ( bookListInDB, status ) ->
	# 	$scope.bookListInDB = bookListInDB
	# .then ->
	# 	return
	$scope.isRegiterd = false;

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

	$scope.search = ( newBook )->
		console.log newBook, 'postAuthor clicked'
		$scope.isWaiting = true

		httpOptToDB =
			method  : 'post'
			url	 : '/search/db'
			data	: { newBook: $scope.newBook }

		httpOptToAmazon =
			method  : 'post'
			url	 : '/search/amazon'
			data	: { newBook: $scope.newBook }

		$http( httpOptToDB )
		.success ( data, status ) ->
			$scope.bookListInDB 	= data.bookListInDB
			return
		.then ->
			console.log '/search/db 完了'
			return
		$http( httpOptToAmazon )
		.success ( data, status ) ->
			$scope.bookListInAmazon = data.bookListInAmazon
			return
		.then ->
			console.log '/search/amazon 完了'
			$scope.isWaiting 	= false
			$scope.newBook 	= ''
			return
		return

	$scope.registBook = ( newBook, $index ) ->
		console.log newBook
		httpOpt =
			method  : 'post'
			url	 : '/save'
			data	: { newBook: newBook }

		$http( httpOpt )
		.success ( data, status ) ->
			console.log 'registBook satatus is', status
			$scope.bookListInDB[ $index ].isRegisterd = true
			$scope.isRegiterd = true;
			$scope.bookListInUser.push( $scope.bookListInDB[ $index ] )
			return
		.then ->
			console.log '/save 完了'
			return
		return
	return
