module.exports = ( $scope, $filter, $http ) ->

    $scope.postBook = ->
        console.log $scope.newBook, 'postAuthor clicked'
        $scope.isRegisterdAuthor = false
        $scope.isExistenceAuthor = false
        $scope.isAddedAuthor     = false

        httpOpt =
            method  : 'post'
            url     : '/post'
            data    : { newBook: $scope.newBook }

        $http( httpOpt )
        .success ( data, status ) ->
            $scope.isRegisterdAuthor = data.isRegisterdAuthor
            $scope.isExistenceAuthor = data.isExistenceAuthor
            $scope.isAddedAuthor     = data.isAddedAuthor
            return
        .then ->
            console.log 'author saved.'
            $scope.newBook = ''
            return

        return

    console.log 'loaded.'
    return
