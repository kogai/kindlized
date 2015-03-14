var makeModel	 = require('../../common/makeModel');

var userSchema  = {
	mail : {
		type  : String,
		index : {
			unique : true
		}
	},
	pwd            : String,
	uuid           : String,
	isVerified     : Boolean,
   bookList       : Array
};

module.exports = new makeModel( 'User', userSchema );

/*

{
	mail : "kogai0121@gmail.com"
	},
	pwd            : "encryptedStrings",
	uuid           : "uniqStrings",
	isVerify       : false,
    bookList       : [
        // extends bookSchema
        {
            _id: "***********",
            isNotified: false
        }
    ]
}

*/
