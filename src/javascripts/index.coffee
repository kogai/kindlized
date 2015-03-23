app = require('./lib/app')
account = require('./lib/account')
analytics = require('./lib/analytics')

angular.module('App',[])
    .controller(
        'postNewBook',
        [ '$scope', '$filter', '$http', app ]
    )
    .controller(
        'account',
        [ '$scope', '$http', '$window', account ]
    )
    
analytics()
