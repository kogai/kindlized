import mongoose from 'mongoose';
import mockgoose from 'mockgoose';
if (process.env.NODE_ENV === 'test') {
  mockgoose(mongoose);
}
const mongodbCredential = process.env.KINDLIZED_MONGODB;
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
    updateWordAt: Date,
  },
  isKindlized: Boolean,
  isKindlizedUrl: Boolean,
});

export default db.model('Book', BookSchema);
