var modelAuthor 		= require( 'author/lib/modelAuthor' );
var reduceListByDate = require( 'common/reduceListByDate' );
var constant			= require( 'common/constant' );

var Q = require('q');
require('should');

// module.exports = function(){
	describe('common/reduceListByDateのテスト', function () {
		it( 'テストが動作している', function( done ){
			(5).should.be.exactly(5);
			done();
	    });

		this.timeout( 0 );
		var list;

		before( function( done ){
			modelAuthor.find( {}, function( err, result ){
				reduceListByDate( result )
				.then( function( result ){
					list = result;
					done();
				});
			});
		});

		it( '取得したデータは配列', function(){
			list.should.be.instanceof( Array );
		});

		it( '規定の値より後のデータは含まれない', function(){
			for (var i = 0; i < list.length; i++) {

				var lastModifyTime = list[i].lastModified || list[i]._id.getTimestamp();
				var todayDate		 = moment();
				var diffDay			 = todayDate.diff( lastModifyTime, 'days' );

				( diffDay < constant.periodicalDay ).should.be.exactly( true )
			}
		});
	});
// }
