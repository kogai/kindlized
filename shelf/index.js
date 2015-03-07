var regularInterval = require('./lib/regularInterval');
var data = {
  times: 10,
  interval: 300,
  searchExpression: {},
  callBack: function( countExec ){
    console.log( 'executed', countExec );
  }
}

regularInterval( data );
regularInterval( data );
