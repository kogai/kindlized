var modelUser = require('user');

var serialize = function( user, done ) {
    console.log( 'serialize-user', user );
    done( null, user._id );
};

var deSerialize = function( id, done ) {
    modelUser.findById( id, function( err, user ) {
        done( err, user );
    });
}
