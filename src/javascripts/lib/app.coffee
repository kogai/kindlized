module.exports = ( $scope, $filter, $http ) ->

	httpOpt =
		method : 'get'
		url	 : '/book/user'

	$http( httpOpt )
	.success ( data ) ->
		bookListInUser = data.newBooks
		user = data.user
		$scope.bookListInUser = bookListInUser
		$scope.userName = user.mail
		return
	.then () ->
		return

	$scope.search = ( newBook ) ->
		$scope.isWaiting = true
		$scope.bookListInDB = null

		httpOptToDB =
			method : 'post'
			url	 : '/search/db'
			data	: { newBook: $scope.newBook }

		httpOptToAmazon =
			method : 'post'
			url	 : '/search/amazon'
			data	: { newBook: $scope.newBook }

		$http( httpOptToDB )
		.success ( data, status ) ->
			$scope.bookListInDB = data.bookListInDB
			if(data.bookListInDB.length > 0)
				$scope.isWaiting = false
			return
		.then ->
			$scope.showSuggestedBooks = true
			return

		$http( httpOptToAmazon )
		.success ( data, status ) ->
			if( data.bookListInAmazon.length > 0 )
				$scope.bookListInDB = $scope.bookListInDB.concat( data.bookListInAmazon )
			return
		.then ->
			$scope.isWaiting 	 = false
			$scope.newBook 	 = ''
			return
		return

	$scope.registBook = ( newBook, $index ) ->
		$scope.bookListInDB[ $index ].isRegisterd = true
		$scope.bookListInUser.push( $scope.bookListInDB[ $index ] )
		httpOpt =
			method : 'post'
			url	 : '/save'
			data	: { newBook: newBook }

		$http( httpOpt )
		.success ( data, status ) ->
			return
		.then ->
			return
		return

	$scope.unRegistBook = ( $index ) ->
		_id = $scope.bookListInUser[ $index ]._id
		$scope.bookListInUser.splice( $index, 1 )

		# 更新したモデルをDBに保存

		httpOpt =
			method: 'post'
			url	 : '/reduce'
			data: deleteBookId: _id

		$http( httpOpt )
		.success () ->
			return
		.then () ->
			return
		return
	return
