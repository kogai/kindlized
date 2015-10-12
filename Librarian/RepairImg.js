"use strict";

var util = require('util');
var moment = require('moment-timezone');
var Q = require('q');

var Librarian = require('Librarian/Librarian');
var Collector = require('common/Collector')('book');
var Utils = require('common/Utils')();
var log = require('common/log');

var PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;

/**
@constructor
@classdesc Librarianクラスの継承クラス<br>Imageの更新を行う
@extends Librarian
**/
function RepairImg(opts){
  Librarian.call(this, opts);
}

util.inherits(RepairImg, Librarian);

/**
  RepairImg.updateのラッパー
  @param { Object } book - 書籍データのオブジェクト
  @return { Object } modifiedBook 書籍データのオブジェクト
**/
RepairImg.prototype._updates = function(books, done){
  var update = { "modifiedLog.RepairImgAt": moment() };
  var images;

  var repairedBooks = books.map(function(book){
    try{
      images = book.res.ItemLookupResponse.Items[0].Item[0].ImageSets;
      images = JSON.stringify(images);
      log.info('images更新: ' + book.title);
    }catch(e){
      images = "";
      log.warn.info(util.inspect(book.res.ItemLookupResponse, null, null));
    }
    book.images = images;
    return book;
  });

  Collector.updateCollections(repairedBooks, update, function(err){
    if(err){
      return done(err);
    }
    done();
  });
};

RepairImg.prototype.cron = function(){
  var d = Q.defer();

  var _fetch = Utils.defer(this.fetch.bind(this));
  var _sequential = Utils.defer(this.sequential.bind(this));
  var _updates = Utils.defer(this._updates.bind(this));

  Q.when()
  .then(_fetch)
  .then(_sequential)
  .then(_updates)
  .fail(function(err){
    return log.info(err);
  })
  .done(function(){
    d.resolve();
  });

  return d.promise;
};

module.exports = function(opts){
  var _opts = opts || {};

  _opts.conditions = {
    $and: [
      {
        $or: [
          { images: null },
          { images: { $exists: false } },
          { $where: "this.images == 0" }
        ]
      },
      {
        $or: [
          { "modifiedLog.RepairImgAt": { $exists: false } },
          { "modifiedLog.RepairImgAt": { "$lte": moment().subtract(PERIODICAL_DAY, 'days') } }
        ]
      }
    ]
  };
  return new RepairImg(_opts);
};
