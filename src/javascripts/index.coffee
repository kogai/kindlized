app = require('./lib/app')
account = require('./lib/account')
analytics = require('./lib/analytics')
intro = require('./lib/intro')

angular.module('App',[])
    .controller(
        'postNewBook',
        [ '$scope', '$filter', '$http', app ]
    )
    .controller(
        'account',
        [ '$scope', '$http', '$window', account ]
    )
    .controller(
        'intro',
        [ '$scope', '$http', '$window', intro ]
    )

analytics()
