module.exports = ( $scope, $filter, $http ) ->

    $scope.postAuthor = ->
        console.log $scope.newAuthor, 'postAuthor clicked'

        httpOpt =
            method: 'post'
            url: '/'
            data: { newAuthor: $scope.newAuthor }

        $http( httpOpt )
        .success ->
            console.log 'post is sucess.'
        .then ->
            console.log 'author saved.'
            $scope.newAuthor = ''
            return

    console.log 'loaded.'
    return
