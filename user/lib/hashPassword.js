var modelUser           = require( 'user/lib/modelUser' );
var constant 			= require( 'common/constant' );
var bcrypt 				= require( 'bcrypt' );
var SALT_WORK_FACTOR 	= constant.SALT_WORK_FACTOR;

module.exports = function( ){
    userSchema.pre( 'save' , function( next ) {
        var user = this;

        // only hash the password if it has been modified (or is new)
        if ( !user.isModified( 'password' ) ) return next();

    	var generateSalt = function(){
    		var d = Q.defer();
    	    bcrypt.genSalt( SALT_WORK_FACTOR, function(err, salt) {
    	        if (err) return next(err);

    			d.resolve(salt);
    	    });
    		return d.promise;
    	};

    	var hashPassword = function( salt ){
    		var d = Q.defer();
    	    bcrypt.hash( user.password, salt, function(err, hash) {
    	        if (err) return next(err);

    	        user.password = hash;
    			d.resolve( hash );
    	    });
    		return d.promise;
    	};

    	generateSalt()
    	.then( hashPassword )
    	.done( function( hash ){
    		next();
    	});
    });
}
