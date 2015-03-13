module.exports = ( $scope, $filter, $http ) ->
    httpOpt =
        method  : 'get'
        url     : '/book'
        data    : { newBook: $scope.newBook }

    $http( httpOpt )
    .success ( bookListInDB, status ) ->
        console.log 'book fetch', bookListInDB
        $scope.bookListInDB = bookListInDB
    .then ->
        console.log 'book fetched.'
        return

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
            $scope.showSuggestedBooks   = true
            $scope.bookListInAmazon     = data.bookListInAmazon
            $scope.isWaiting            = false
            return
        .then ->
            console.log 'author saved.'
            $scope.newBook = ''
            return

        return

    $scope.registBook = ( newBook ) ->
        console.log newBook
        httpOpt =
            method  : 'post'
            url     : '/save'
            data    : { newBook: newBook }

        $http( httpOpt )
        .success ( data, status ) ->
            console.log 'registBook satatus is', status
            # $scope.isNotExistenceBook   = data.isNotExistenceBook
            # $scope.showSuggestedBooks   = true
            # $scope.bookListInAmazon     = data.bookListInAmazon
            # $scope.isWaiting            = false
            return
        .then ->
            console.log 'author saved.'
            $scope.newBook = ''
            return
        return

    console.log 'loaded.'
    return
