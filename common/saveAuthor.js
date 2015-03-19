var modelAuthor = require('author/lib/modelAuthor');
var moment = require('moment-timezone');
var Q = require('q');

module.exports = function( author ) {
  var d = Q.defer();
  modelAuthor.findOne({ name: author }, function( err, authorInDB ) {
    if (!authorInDB) {
      var currentDay = new Date();
          currentDay.setDate( currentDay.getDate() - 30 );

      var initialModifiedTime = moment( currentDay );

      var newAuthor = new modelAuthor({
        name: author,
        lastModified: initialModifiedTime
      });
      newAuthor.save(function( err ) {
        console.log( '著者:' + author + 'が登録されました'　);
        if (err) console.log(err);
        d.resolve();
      });
    }else{
      d.resolve();
    }
  });
  return d.promise;
};
