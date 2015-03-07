var regularInterval = require('./lib/regularInterval');
var data = {
  times: 10,
  interval: 300,
  searchExpression: {},
  callBack: function( countExec, searchExpression ){
    console.log( 'executed', countExec, searchExpression );
  }
}

regularInterval( data );
regularInterval( data );
