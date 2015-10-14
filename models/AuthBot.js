import mongoose from 'mongoose';
import mockgoose from 'mockgoose';
import makeCredential from 'common/makeCredential';

if (process.env.NODE_ENV === 'test') {
  mockgoose(mongoose);
}

const mongodbCredential = makeCredential('mongodb');
const db = mongoose.createConnection(mongodbCredential);

const AuthBotSchema = {
  screen_name: String,
  user: Object,
  accessToken: String,
  accessTokenSecret: String,
};

export default db.model('AuthBot', AuthBotSchema);
