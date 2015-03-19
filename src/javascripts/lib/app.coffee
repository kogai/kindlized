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
		console.log '/book/user 完了'
		return

	$scope.search = ( newBook ) ->
		console.log newBook, 'postAuthor clicked'
		$scope.isWaiting = true

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
			$scope.bookListInDB 	 = data.bookListInDB
			return
		.then ->
			$scope.isWaiting = false
			$scope.showSuggestedBooks = true
			console.log '/search/db 完了'
			return

		$http( httpOptToAmazon )
		.success ( data, status ) ->
			$scope.bookListInDB = $scope.bookListInDB.concat( data.bookListInAmazon )
			return
		.then ->
			console.log '/search/amazon 完了'
			$scope.isWaiting 	 = false
			$scope.newBook 	 = ''
			return
		return

	$scope.registBook = ( newBook, $index ) ->
		$scope.bookListInDB[ $index ].isRegisterd = true
		$scope.bookListInUser.push( $scope.bookListInDB[ $index ] )
		console.log newBook
		httpOpt =
			method : 'post'
			url	 : '/save'
			data	: { newBook: newBook }

		$http( httpOpt )
		.success ( data, status ) ->
			console.log 'registBook satatus is', status
			return
		.then ->
			console.log '/save 完了'
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
			console.log '/reduce 完了'
			return
		return
	return
