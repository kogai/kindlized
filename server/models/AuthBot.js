import mongoose from 'mongoose';
import mockgoose from 'mockgoose';

if (process.env.NODE_ENV === 'test') {
  mockgoose(mongoose);
}

const mongodbCredential = process.env.KINDLIZED_MONGODB;
const db = mongoose.createConnection(mongodbCredential);

const AuthBotSchema = {
  screen_name: String,
  user: Object,
  accessToken: String,
  accessTokenSecret: String,
};

export default db.model('AuthBot', AuthBotSchema);
