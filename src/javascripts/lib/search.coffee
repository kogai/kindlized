imageStrModifyer = require('./imageStrModifyer')

module.exports = ($scope, $filter, $http) ->
	$scope.search = (newBook) ->

		$scope.isWaiting = true
		$scope.bookListInDB = []
		isCompleteDB = false
		isCompleteAmazon = false

		completeTasks = ->
			if(isCompleteDB && isCompleteAmazon)
				$scope.newBook = ''
				$scope.isWaiting = false
			return

		# DBの検索ポスト
		httpOptToDB =
			method: 'post'
			url: '/search/db'
			data: { newBook: $scope.newBook }

		$http(httpOptToDB)
		.success (data, status) ->
			if(data.bookListInDB.length > 0)
				$scope.showSuggestedBooks = true
			$scope.bookListInDB = $scope.bookListInDB.concat(imageStrModifyer(data.bookListInDB))
			isCompleteDB = true
			completeTasks()
			return

		# AmazonAPIの検索ポスト
		httpOptToAmazon =
			method: 'post'
			url	: '/search/amazon'
			data: { newBook: $scope.newBook }

		$http(httpOptToAmazon)
		.success (data, status) ->
			if(data.bookListInAmazon.length > 0)
				$scope.showSuggestedBooks = true
			$scope.bookListInDB = $scope.bookListInDB.concat(imageStrModifyer(data.bookListInAmazon))
			isCompleteAmazon = true
			completeTasks()
			return
		.error (data, status, headers, config) ->
			console.log data
			console.log status
			return

		return
