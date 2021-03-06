'use strict';

const util = require('util');
const Q = require('q');
const moment = require('moment-timezone');

const Librarian = require('Librarian/Librarian');
const PERIODICAL_DAY = require('common/constant').PERIODICAL_DAY;
const log = require('common/log');

/**
* @constructor
* @classdesc Librarianクラスの継承クラス<br>AuthorityASINの更新を行う
* @extends Librarian
**/
function AddASIN(opts) {
  Librarian.call(this, opts);
}

util.inherits(AddASIN, Librarian);

/**
  AddASIN.updateのラッパー
  @param { Object } book - 書籍データのオブジェクト
  @return { Object } modifiedBook 書籍データのオブジェクト
**/
AddASIN.prototype._updates = function updates(book) {
  const d = Q.defer();

  let AuthorityASIN;
  let Items;

  try {
    Items = book.res.ItemLookupResponse.Items;
    Items.map(function(item) {
      if (item.Item[0].RelatedItems[0].RelationshipType[0] === 'AuthorityTitle') {
        AuthorityASIN = item.Item[0].RelatedItems[0].RelatedItem[0].Item[0].ASIN;
      }
    });
    log.info('AuthorityASIN 更新:' + book.title);
  } catch (error) {
    AuthorityASIN = undefined;
    log.info('AuthorityASIN 未更新:' + book.title);
  }

  const update = {
    AuthorityASIN: AuthorityASIN,
    'modifiedLog.AddASINAt': moment(),
  };

  const options = { new: true };

  this.update(book, update, options, function(err, modifiedBook) {
    if (err) {
      return d.reject(err);
    }
    d.resolve(modifiedBook);
  });

  return d.promise;
};

AddASIN.prototype.cron = function() {
  var d = Q.defer();
  var _updates = this._updates.bind(this);

  this.run(function(books) {
    Q.all(books.map(_updates))
    .then(function(modifiedBooks) {
      d.resolve();
    })
    .fail(function(err) {
      log.info(err);
      d.resolve();
    });
  });

  return d.promise;
};

module.exports = function createAddASIN(opts) {
  const _opts = opts || {};

  _opts.conditions = {
    $and: [
      {
        $or: [
          { AuthorityASIN: { $exists: false } },
          { AuthorityASIN: [''] },
          { AuthorityASIN: undefined },
          { AuthorityASIN: 'UNDEFINED' },
          { AuthorityASIN: ['UNDEFINED'] },
        ],
      },
      {
        $or: [
          { 'modifiedLog.AddASINAt': { $exists: false } },
          { 'modifiedLog.AddASINAt': { '$lte': moment().subtract(PERIODICAL_DAY, 'days') } },
        ],
      },
    ],
  };

  _opts.amazonConditions = {
    RelationshipType: 'AuthorityTitle',
    ResponseGroup: 'RelatedItems',
  };
  _opts.sort = {
    'modifiedLog.AddASINAt': 1,
  };

  return new AddASIN(_opts);
};
