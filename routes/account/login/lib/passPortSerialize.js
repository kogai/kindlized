'use strict';

var modelUser = require('models/User');

var serialize = function(user, done) {
  done(null, user._id);
};

var deSerialize = function(id, done) {
  modelUser.findById(id, function(err, user) {
    done(err, user);
  });
};

module.exports = {
  serialize: serialize,
  deSerialize: deSerialize
};
