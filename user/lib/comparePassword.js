var bcrypt = require( 'bcrypt' );

module.exports = function( candidatePassword, hashedPassword , callBack ) {
	console.log( 'candidatePassword', candidatePassword );
	console.log( 'hashedPassword', hashedPassword );
	console.log( 'callBack', callBack );
	bcrypt.compare( candidatePassword, hashedPassword, function( err, isMatch ) {
		console.log( 'isMatch', isMatch );
		if ( err ) return callBack( err );
		callBack( null , isMatch );
	});
};
