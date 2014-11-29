var mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
var credential = require('../credential');
var db       = mongoose.createConnection(credential.mongodb);
var bcrypt = require('bcrypt');
var SALT_WORK_FACTOR = 10;

var MongoDB = {};

var userSchema = new mongoose.Schema({
    mail : {
    	type : String ,
    	// required : true ,
    	index : {
	    	unique: true 
    	}
    },
    pwd : {
    	type : String ,
    	// required : true
    },
    twitterId : String,
    twitterName : String,
    uuid : String,
    is_verify : String,
    is_seller : Boolean,
});

userSchema.pre( 'save' , function(next) {
    var user = this;

    // only hash the password if it has been modified (or is new)
    if (!user.isModified('pwd')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password along with our new salt
        bcrypt.hash(user.pwd, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.pwd = hash;
            next();
        });
    });
});

userSchema.methods.comparePassword = function( candidatePassword , cb) {
    bcrypt.compare(candidatePassword, this.pwd, function(err, isMatch) {
        if (err) return cb(err);
        cb( null , isMatch);
    });
};

// create object

userSchema.plugin( uniqueValidator , { message: 'すでに登録されているメールアドレスです' });
MongoDB.User = db.model('User', userSchema);

module.exports = MongoDB;