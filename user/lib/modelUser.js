var makeModel = require('common/makeModel');

var userSchema = {
  mail: {
    type: String,
    index: {
      unique: true
    }
  },
  password: String,
  verifyId: String,
  isVerified: Boolean,
  bookList: Array
};

module.exports = new makeModel('User', userSchema, true);
