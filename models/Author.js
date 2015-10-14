import mongoose from 'mongoose';
import mockgoose from 'mockgoose';
import makeCredential from 'common/makeCredential';

if (process.env.NODE_ENV === 'test') {
  mockgoose(mongoose);
}

const mongodbCredential = makeCredential('mongodb');
const db = mongoose.createConnection(mongodbCredential);

var AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    index: {
      unique: true
    }
  },
  lastModified: Date,
  pageId: Number
});

var SequenceSchema = new mongoose.Schema({
  name: String,
  seq: Number
});

SequenceSchema.index = { name: 1 };
var SequenceModel = db.model('Sequence', SequenceSchema );

AuthorSchema.pre('save', function (next) {
  var author = this;
  var query, options, update;
  if(!author.isNew){
    return next();
  }
  query = {
  };
  update = {
    $inc: {
      seq: 1
    }
  };
  options = {
    upsert: true
  };
  return SequenceModel.findOneAndUpdate(query, update, options, (function(_this) {
    return function(err, data) {
      if (!err && data) {
        _this.pageId = data.seq;
        return next();
      }
      return next(err || data);
    };
  }(author)));
});

module.exports = db.model('Author', AuthorSchema );
