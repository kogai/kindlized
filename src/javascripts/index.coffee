app = require('./lib/app')

angular.module('App',[])
    .controller(
        'postNewAuthor',
        [ '$scope', '$filter', '$http', app ]
    )
