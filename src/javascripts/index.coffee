app = require('./lib/app')

angular.module('App',[])
    .controller(
        'postNewBook',
        [ '$scope', '$filter', '$http', app ]
    )
