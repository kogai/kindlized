var MakeModel = require('common/makeModel');

/**
@example
{
  mail: "kogai0121@gmail.com",
  password: '',
  verifyId: '',
  isVerified: true,
  bookList: [],
  seriesList: [{
    _id: 'foobarbuzz',
    seriesKeyword: '我が愛しのヲタ彼女'
  }]
}
**/
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
  seriesList: Array,
  reccomendBookList: [
    {
      _id: String,
      title: String,
      isNotified: Boolean
    }
  ]
};

module.exports = new MakeModel('User', userSchema, true);
