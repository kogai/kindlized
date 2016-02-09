import Q from 'q';
import _ from 'underscore';
import request from 'superagent';

function Utils() {
  this.slackAPI = process.env.KINDLIZED_SLACK;
}


/**
引数にコールバック関数を持つメソッドをPromiseオブジェクトを返す関数でラップする
@param { Function } method - callback関数を引数に持つメソッド
@example
var _method = this.defer(this.method.bind(this));
_method().done(function(items){ console.log(items, "done."); });
**/
Utils.prototype.defer = function(method) {
  return function() {
    var d = Q.defer();
    var args = Array.prototype.slice.call(arguments);
    args = _.compact(args);

    // methodに渡されているdoneコールバック関数を
    // Promiseのdefer.resolve/rejectする関数
    args.push(function(err, res) {
      if (err) {
        return d.reject(err);
      }
      d.resolve(res);
    });

    method.apply(this, args);

    return d.promise;
  };
};


Utils.prototype.map = function(collections, method, done) {
  Q.all(collections.map(function(item) {
    var d = Q.defer();

    method(item, function(err, result) {
      if (err) {
        return d.reject(err);
      }
      d.resolve(result);
    });

    return d.promise;
  }))
  .then(function(results) {
    done(null, results);
  })
  .fail(function(err) {
    done(err);
  });
};


/**
@param { String } msg - Slackに通知するメッセージ
**/
Utils.prototype.postSlack = function postSlack(msg, done = function callback() {}) {
  if (process.env.NODE_ENV === 'test') {
    return done(null);
  }
  request
  .post(this.slackAPI)
  .send({
    text: msg,
  })
  .end((err, ret)=> {
    if (err) {
      return done(err);
    }
    done(null, ret);
  });
};

export default function() {
  return new Utils();
}
