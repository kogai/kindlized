var MakeModel = require('common/makeModel');

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
  bookList: Array,
  authorList: Array,
  reccomendBookList: [
    {
      _id: String,
      title: String,
      isNotified: Boolean
    }
  ]
};

module.exports = new MakeModel('User', userSchema, true);