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
  bookList: Array,
  authorList: [
    {
      name: String,
      _id: String
    }
  ],
  reccomendBookList: [
    {
      _id: String,
      title: String,
      isNotified: Boolean
    }
  ]
};

module.exports = new makeModel('User', userSchema, true);
