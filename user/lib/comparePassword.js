var bcrypt = require('bcrypt');

module.exports = function(candidatePassword, hashedPassword, callBack) {
  bcrypt.compare(candidatePassword, hashedPassword, function(err, isMatch) {
    if (err) return callBack(err);
    callBack(null, isMatch);
  });
};
