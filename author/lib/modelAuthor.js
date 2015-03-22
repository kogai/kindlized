var makeModel     = require('common/makeModel');

var AuthorSchema  = {
  name: {
    type: String,
    index: { unique: true }
  },
  wroteBooks: Number,
  lastModified	: Date,
  checkDate: Array
};

module.exports = new makeModel( 'Author', AuthorSchema );
