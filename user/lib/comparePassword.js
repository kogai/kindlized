var modelUser		   = require( 'user/lib/modelUser' );
var bcrypt 				= require( 'bcrypt' );

module.exports = function( candidatePassword , callBack ) {
	bcrypt.compare( candidatePassword, this.password, function( err, isMatch ) {
		if ( err ) return callBack( err );
		callBack( null , isMatch );
	});
};
