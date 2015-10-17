_ = require('underscore')
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
      method: 'get'
      url: '/api/search/db'
      params: { query: $scope.newBook }

    $http(httpOptToDB)
    .success (data, status) ->
      if(data.length > 0)
        $scope.showSuggestedBooks = true
      $scope.bookListInDB = $scope.bookListInDB.concat(imageStrModifyer(data))
      isCompleteDB = true
      completeTasks()
      return

    # AmazonAPIの検索ポスト
    httpOptToAmazon =
      method: 'get'
      url  : '/api/search/amazon'
      params: { query: $scope.newBook }

    $http(httpOptToAmazon)
    .success (data, status) ->
      if(data.length > 0)
        $scope.showSuggestedBooks = true

      books = $scope.bookListInDB.concat(imageStrModifyer(data))
      books = _.uniq(books, (book) ->
        book.ASIN[0]
      )

      $scope.bookListInDB = books
      isCompleteAmazon = true
      completeTasks()
      return
    .error (data, status, headers, config) ->
      return

    return
