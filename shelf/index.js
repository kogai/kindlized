var regularInterval = require('./lib/regularInterval');
var callBack = function( countExec, searchExpression ){
  console.log( 'executed', countExec, searchExpression );
};
regularInterval( 10, 300, {}, callBack );
