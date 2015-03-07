// - 60s間隔で実行される
// - 規定の変数回実行される

var regularInterval = function( times, interval,  searchExpression ){
  var countExec = 0;
  console.log( countExec );
  console.log( times );
  console.log( interval );
  console.log( searchExpression );
}

regularInterval( 10, 100, {} );
