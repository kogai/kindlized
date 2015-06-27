_ = require('underscore')
imageStrModifyer = require('./imageStrModifyer')

module.exports = ($scope, $filter, $http) ->
	$scope.editable = false

	# 登録済みの書籍の取得
	$http({
		method: 'get'
		url: '/api/user/book'
	})
	.success (res) ->
		$scope.bookListInUser = res.books
		return

	# メールアドレスの取得
	$http({
		method: 'get'
		url: '/api/user/account'
		params: {
			props: 'mail'
		}
	})
	.success (res) ->
		$scope.mail = res.mail
		return

	$scope.switchEditable = ->
		$scope.editable = !$scope.editable
		return

	$scope.modify = (property, modifiedMail) ->
		$http({
			method: 'put'
			url: '/api/user/account/'
			data: {
				property: property
				data: modifiedMail
			}
		})
		.success (data, status) ->
			$scope.mail = modifiedMail
			$scope.editable = !$scope.editable
			return
		return

	$scope.search = ( newBook ) ->
		$scope.isWaiting = true
		$scope.bookListInDB = null

		httpOptToDB =
			method : 'get'
			url : '/api/search/db'
			params : { query: $scope.newBook }

		httpOptToAmazon =
			method : 'get'
			url : '/api/search/amazon'
			params : { query: $scope.newBook }

		$http(httpOptToDB)
		.success (data, status) ->
			if(data.length > 0)
				$scope.isWaiting = false
				$scope.showSuggestedBooks = true
			$scope.bookListInDB = imageStrModifyer(data)
			return
		.then ->

			$http( httpOptToAmazon )
			.success (bookListInAmazon, status) ->
				if( bookListInAmazon.length > 0 )
					books = $scope.bookListInDB.concat(imageStrModifyer(bookListInAmazon))
					books = _.uniq(books, (book) ->
						book.ASIN[0]
					)

					$scope.bookListInDB = books
					$scope.showSuggestedBooks = true
				return
			.then ->
				$scope.isWaiting = false
				$scope.newBook = ''
				return
			return
		return

	$scope.registBook = ( newBook, $index ) ->
		$scope.bookListInDB[ $index ].isRegisterd = true
		$scope.bookListInUser.push( $scope.bookListInDB[ $index ] )
		httpOpt =
			method : 'post'
			url : '/api/user/book'
			data : { newBook: newBook }

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
			url : '/reduce'
			data: deleteBookId: _id

		$http( httpOpt )
		.success () ->
			return
		.then () ->
			return
		return
	return
