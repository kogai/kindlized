var Q				= require('q');
var moment			= require('moment-timezone');
var constant		= require( 'common/constant' );

module.exports = function( list ){
	var d = Q.defer();
	var siftedList = [];
	for (var i = 0; i < list.length; i++) {

		var lastModifyTime = list[i].lastModified || list[i]._id.getTimestamp();
		var todayDate		 = moment();
		var diffDay			 = todayDate.diff( lastModifyTime, 'days' );

		if( diffDay > constant.periodicalDay ){
			siftedList.push( list[i] );
		}
	}
	d.resolve( siftedList );
	return d.promise;
};
