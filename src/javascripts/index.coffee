app = require('./lib/app')
account = require('./lib/account')

angular.module('App',[])
    .controller(
        'postNewBook',
        [ '$scope', '$filter', '$http', app ]
    )
    .controller(
        'account',
        [ '$scope', '$http', '$window', account ]
    )
