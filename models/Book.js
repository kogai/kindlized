import mongoose from 'mongoose';
import mockgoose from 'mockgoose';
import makeCredential from 'common/makeCredential';

if (process.env.NODE_ENV === 'test') {
  mockgoose(mongoose);
}

const mongodbCredential = makeCredential('mongodb');
const db = mongoose.createConnection(mongodbCredential);

const BookSchema = new mongoose.Schema({
  ASIN: {
    type: Array,
    index: {
      unique: true,
    },
  },
  AuthorityASIN: Array,
  author: Array,
  title: Array,
  publisher: Array,
  publicationDate: Array,
  price: Array,
  url: Array,
  images: String,
  modifiedLog: {
    AddBookAt: Date,
    InspectKindlizeAt: Date,
    AddASINAt: Date,
    RepairImgAt: Date,
    UpdateUrlAt: Date,
  },
  isKindlized: Boolean,
  isKindlizedUrl: Boolean,
});

module.exports = new MakeModel('Book', bookrSchema);
