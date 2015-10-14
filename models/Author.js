import mongoose from 'mongoose';
import mockgoose from 'mockgoose';

if (process.env.NODE_ENV === 'test') {
  mockgoose(mongoose);
}

const mongodbCredential = process.env.KINDLIZED_MONGODB;
const db = mongoose.createConnection(mongodbCredential);

const AuthorSchema = new mongoose.Schema({
  name: {
    type: String,
    index: {
      unique: true,
    },
  },
  lastModified: Date,
  pageId: Number,
});

const SequenceSchema = new mongoose.Schema({
  name: String,
  seq: Number,
});

SequenceSchema.index = { name: 1 };
const SequenceModel = db.model('Sequence', SequenceSchema );

AuthorSchema.pre('save', function preSave(next) {
  const author = this;
  if (!author.isNew) {
    return next();
  }
  const query = {};
  const update = { $inc: { seq: 1 } };
  const options = { upsert: true };

  SequenceModel.find({}, (err, sequencialIDs)=> {
    if (err) {
      return next(err);
    }
    if (sequencialIDs.length > 0) {
      return SequenceModel.findOneAndUpdate(query, update, options, (updateError, updatedSequencialID)=> {
        if (updateError) {
          return next(updateError);
        }
        author.pageId = updatedSequencialID.seq;
      });
    }
    const sequencialID = new SequenceModel({
      name: 'sequencialID',
      seq: 1,
    });
    sequencialID.save((saveError)=> {
      if (saveError) {
        return next(saveError);
      }
      author.pageId = sequencialID.seq;
      return next();
    });
  });
});

module.exports = db.model('Author', AuthorSchema );
