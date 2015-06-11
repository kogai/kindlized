var Q = require('q');
var _ = require('underscore');
var express = require('express');
var router = express.Router();
var modelUser = require('models/User');
var constant = require('common/constant');

var fetchModelUser = function (req, res) {
	'use strict';
  var d = Q.defer();
  var userId = req.session.passport.user;
  modelUser.findOne({
    _id: userId
  }, function(err, user) {
		if(err){
			d.reject();
		}
    d.resolve({
      userId: userId,
      user: user,
      req: req,
      res: res
    });
  });
  return d.promise;
};

var reduceBookListinUser = function(data) {
	'use strict';
  var d = Q.defer();
  var bookId = data.req.body.deleteBookId;
  var user = data.user;
  var bookList = user.bookList;
  var reduceBookList = bookList.map(function (book) {
		if(book.bookId.toString() !== bookId ){
			return book;
		}
	});

  data.reduceBookList = _.compact(reduceBookList);
  d.resolve(data);
  return d.promise;
};

var saveReducedBookInUser = function(data) {
	'use strict';
  var d = Q.defer();
  var reduceBookList = data.reduceBookList;
  var userId = data.userId;
  modelUser.findOneAndUpdate({
    _id: userId
  }, {
    bookList: reduceBookList
  }, function(err, modifiedUser) {
		if(err){
			d.reject();
		}
    data.modifiedUser = modifiedUser;
    d.resolve(data);
  });
  return d.promise;
};

var renderRouter = function(data) {
	'use strict';
  var res = data.res;
  var d = Q.defer();
  res.send();
  d.resolve(data.reduceBookList);

  return d.promise;
};

module.exports = function(req, res) {
	'use strict';
  fetchModelUser(req, res)
    .then(reduceBookListinUser)
    .then(saveReducedBookInUser)
    .then(renderRouter)
    .done(function(reduceBookList) {
      try {
        console.log('このユーザーは' + reduceBookList.length + '冊の書籍を登録している');
      } catch (err) {
        console.log('このユーザーは書籍を登録していない');
      }
    });
};
