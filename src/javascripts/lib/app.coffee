_ = require('underscore')
imageStrModifyer = require('./imageStrModifyer')

module.exports = ($scope, $filter, $http) ->
	$scope.editable = false
	$scope.maxCount = 0
	$scope.pagenation = []
	$scope.activePage = 0

	# 登録済みの書籍の取得
	$scope.fetchPage = (page) ->
		$http({
			method: 'get'
			url: '/api/user/book'
			params: {
				page: page
			}
		})
		.success (res) ->
			$scope.bookListInUser = res.books
			$scope.pagenation = _.range(Math.round(res.maxCount / 10))
			$scope.activePage = Number(page)
			return

	$scope.fetchPage(1)

	$scope.isActivePage = (index) ->
		$scope.activePage == index + 1

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

	$scope.search = (newBook) ->
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
		deleteBookId = $scope.bookListInUser[$index]._id
		$scope.bookListInUser.splice($index, 1)

		# 更新したモデルをDBに保存
		$http({
			method: 'delete'
			url : '/api/user/book'
			params : { deleteBookId: deleteBookId }
		})
		.success () ->
			return
		return
	return
