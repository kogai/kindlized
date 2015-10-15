import mongoose from 'mongoose';
import mockgoose from 'mockgoose';
import Promise from 'bluebird';
import bcrypt from 'bcryptjs';
import { SALT_WORK_FACTOR } from 'common/constant';
if (process.env.NODE_ENV === 'test') {
  mockgoose(mongoose);
}

const mongodbCredential = process.env.KINDLIZED_MONGODB;
const db = mongoose.createConnection(mongodbCredential);

/**
@example
{
  mail: "kogai0121@gmail.com",
  password: '',
  verifyId: '',
  isVerified: true,
  bookList: [{
    bookId: "foobarbuzz",
    isNotified: false,
    title: "お前ら全員面倒くさい(1)"
  }],
  modifiedLog: [
    seriesListAt: { "$date": "2015-06-01T04:00:00.000Z" }
  ],
  seriesList: [{
    _id: 'foobarbuzz',
    seriesKeyword: '我が愛しのヲタ彼女',
    currentPublished: Number,
    pastPublished: Number,
  }]
}
**/

const UserSchema = new mongoose.Schema({
  mail: {
    type: String,
    index: {
      unique: true,
    },
  },
  password: String,
  verifyId: String,
  isVerified: Boolean,
  bookList: Array,
  seriesList: Array,
  modifiedLog: {
    seriesListAt: Date,
  },
});

UserSchema.methods.comparePassword = (candidatePassword, hashedPassword, done)=> {
  bcrypt.compare(candidatePassword, hashedPassword, (err, isMatch)=> {
    if (err) {
      return done(err);
    }
    done(null, isMatch);
  });
};

function generateSalt(rawPassword) {
  return new Promise((resolve, reject)=> {
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt)=> {
      if (err) {
        return reject(err);
      }
      resolve({ rawPassword, salt });
    });
  });
}

function hashPassword({ rawPassword, salt }) {
  return new Promise((resolve, reject)=> {
    bcrypt.hash(rawPassword, salt, (err, hash)=> {
      if (err) {
        return reject(err);
      }
      resolve(hash);
    });
  });
}

UserSchema.pre('save', function preSave(next) {
  const _user = this;
  // only hash the password if it has been modified (or is new)
  if (!_user.isModified('password')) {
    return next();
  }

  generateSalt(_user.password)
  .then(hashPassword)
  .then((hash)=> {
    _user.password = hash;
  })
  .catch((err)=> {
    return next(err);
  })
  .finally(()=> {
    next();
  });
});

module.exports = db.model('user', UserSchema);
