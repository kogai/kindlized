module.exports = ( $scope, $filter, $http ) ->

    $scope.searchBook = ->
        console.log $scope.newBook, 'postAuthor clicked'
        $scope.isNotExistenceBook   = false
        $scope.isBookAdded          = false
        $scope.showSuggestedBooks   = false
        $scope.isWaiting            = true

        httpOpt =
            method  : 'post'
            url     : '/post'
            data    : { newBook: $scope.newBook }

        $http( httpOpt )
        .success ( data, status ) ->
            $scope.isNotExistenceBook   = data.isNotExistenceBook
            $scope.showSuggestedBooks   = data.showSuggestedBooks
            $scope.bookListInDB         = data.bookListInDB
            $scope.bookListInAmazon     = data.bookListInAmazon
            $scope.isWaiting            = false
            return
        .then ->
            console.log 'author saved.'
            $scope.newBook = ''
            return

        return

    $scope.registBook = ( book ) ->
        console.log book
        return

    console.log 'loaded.'
    return
