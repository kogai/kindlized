imageStrModifyer = require('./imageStrModifyer')

module.exports = ( $scope, $filter, $http ) ->
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
			if(data.bookListInDB.length > 0)
				$scope.isWaiting = false
				$scope.showSuggestedBooks = true
			$scope.bookListInDB = imageStrModifyer(data.bookListInDB)
			return
		.then ->

			$http( httpOptToAmazon )
			.success ( data, status ) ->
				if( data.bookListInAmazon.length > 0 )
					console.log data.bookListInAmazon
					$scope.bookListInDB = $scope.bookListInDB.concat( imageStrModifyer(data.bookListInAmazon) )
					$scope.showSuggestedBooks = true
					console.log $scope.bookListInDB
				return
			.then ->
				$scope.isWaiting = false
				$scope.newBook = ''
				return
			return
		return
