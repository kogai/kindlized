import util from 'util';
import moment from 'moment-timezone';
import Q from 'q';
import Promise from 'bluebird';
import log from 'common/log';
import BookModel from 'models/Book';
import AuthorModel from 'models/Author';

/**
@param { Object } book - 保存用に正規化された書籍のデータ
@param { Function } done - 完了時に呼ばれるコールバック関数
**/
function saveBook(book, done) {
  // 必須パラメータの検証
  if (typeof book !== 'object' || util.isArray(book)) { throw new Error('saveBook method required Object parametor.'); }
  if (typeof done !== 'function' || !done) { throw new Error('saveBook method required Function parametor.'); }

  // 必須項目の検証
  if (!book.ASIN) { throw new Error('book param required ASIN property.'); }
  if (!book.author) { throw new Error('book param required author property.'); }
  if (!book.title) { throw new Error('book param required title property.'); }

  const conditions = {
    ASIN: book.ASIN,
  };
  const BookList = this._Model;

  BookList.findOne(conditions, (err, existBook)=> {
    // 既に書籍が存在していたらエラーハンドリングに回す
    if (err) {
      return done(err);
    }
    if (existBook) {
      log.info('登録済みの書籍:' + existBook.title);
      return done(null, null);
    }

    const initialLibrarianTime = moment('2000-01-01');
    const newBook = new BookList({
      ASIN: book.ASIN,
      AuthorityASIN: book.AuthorityASIN || [''],
      author: book.author,
      title: book.title,
      publisher: book.publisher || [''],
      publicationDate: book.publicationDate || [''],
      price: book.price || [''],
      url: book.url || [''],
      images: book.images || '',
      isKindlized: book.isKindlized || false,
      isKindlizedUrl: book.isKindlizedUrl || false,
      modifiedLog: {
        AddBookAt: moment(),
        InspectKindlizeAt: initialLibrarianTime,
        AddASINAt: initialLibrarianTime,
        UpdateUrlAt: initialLibrarianTime,
      },
    });
    newBook.save((saveError)=> {
      if (saveError) {
        return done(saveError);
      }
      done(null, newBook);
    });
  });
}


/**
@param { String } author - 保存する著者の名前
@param { Function } done - 完了時に呼ばれるコールバック関数
**/
function saveAuthor(author, done) {
  const conditions = {
    name: author,
  };
  const Author = this._Model;

  Author.findOne(conditions, function findAuthor(err, existAuthor) {
    // 既に著者が存在していたらエラーハンドリングに回す
    if (err) {
      return done(err);
    }
    if (existAuthor) {
      log.info('登録済みの著者:' + existAuthor.name);
      return done();
    }

    const newAuthor = new Author({
      name: author,
      lastModified: moment(),
    });

    newAuthor.save((saveError)=> {
      if (saveError) {
        return done(saveError);
      }
      done(null, newAuthor);
    });
  });
}

/**
@param { Object } item
@param { Object } update
@param { Function } done - 完了時に呼ばれるコールバック関数
**/
function updateItem(item, update, model, done) {
  if (!item._id) {
    throw new Error('itemには_idが必要');
  }
  const query = { _id: item._id };
  const options = { upsert: true };

  model.findOneAndUpdate(query, update, options, (err)=> {
    if (err) {
      return done(err);
    }
    if (item.name && process.env.NODE_ENV !== 'test') {
      log.info('更新:' + item.name);
    }
    if (item.title && process.env.NODE_ENV !== 'test') {
      log.info('更新:' + item.title);
    }
    done(null);
  });
}

/**
@constructor
**/
function Collector(type) {
  if (!type || typeof type !== 'string') {
    throw new Error('string型のtypeパラメータは必須');
  }
  this.type = type;

  switch (type) {
  case 'author':
    this.save = saveAuthor;
    this._Model = AuthorModel;
    break;
  case 'book':
    this.save = saveBook;
    this._Model = BookModel;
    break;
  default:
    this.save = saveBook;
    this._Model = BookModel;
    break;
  }

  this.collections = [];
  return this;
}

/**
@param { Array } collections
@param { Function } done - 完了時に呼ばれるコールバック関数
**/
Collector.prototype.saveCollections = function saveCollections(collections, done) {
  if (!util.isArray(collections)) {
    throw new Error('collections parametor must be Array.');
  }
  if (typeof done !== 'function' || !done) {
    throw new Error('done parametor must be Function.');
  }

  const save = this.save.bind(this);
  const savedItems = [];
  Promise.reduce(collections, (total, item)=> {
    return new Promise((resolve, reject)=> {
      save(item, (err, savedItem)=> {
        if (err) {
          return reject(err);
        }
        if (savedItem) {
          savedItems.push(savedItem);
        }
        resolve();
      });
    });
  }, null)
  .then(()=> {
    return done(null, savedItems);
  })
  .catch((err)=> {
    return done(err);
  });
};

/**
@param { Object } update
@param { Function } done - 完了時に呼ばれるコールバック関数
**/
Collector.prototype.updateCollections = function updateCollections(collections, update, done) {
  const _self = this;
  Q.all(
    collections.map((item)=> {
      const deffered = Q.defer();
      updateItem(item, update, _self._Model, (err)=> {
        if (err) {
          return deffered.reject(err);
        }
        deffered.resolve();
      });
      return deffered.promise;
    })
  )
  .then(()=> {
    return done(null);
  })
  .fail((err)=> {
    return done(err);
  });
};

export default function(type) {
  return new Collector(type);
}
