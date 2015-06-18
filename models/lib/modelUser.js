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
  seriesList: Array,
	modifiedLog: {
		seriesListAt: Date
	}
};

module.exports = new MakeModel('User', userSchema, true);
