import assert from 'power-assert';
import request from 'supertest';
import app from 'app.js';
import AutherModel from 'models/Author';

describe('/routes/author', ()=> {
  let response;

  before((done)=> {
    const author = new AutherModel({
      name: '鳥山明',
      lastModified: new Date(),
    });

    author.save((saveError)=> {
      if (saveError) {
        return done(saveError);
      }
      request(app)
        .get('/author/1')
        .end((err, ret)=> {
          if (err) {
            return done(err);
          }
          response = ret;
          done();
        });
    });
  });

  it('200を返す', ()=> {
    assert(response.status === 200);
  });
  it('リダイレクトされていない', ()=> {
    assert(response.redirect === false);
  });
  it('x-powered-byを送信している', ()=> {
    assert(response.header['x-powered-by'] === 'Express');
  });
  it('text/htmlを送信している', ()=> {
    assert(response.header['content-type'] === 'text/html; charset=utf-8');
  });
  it('APIエンドポイントではない', ()=> {
    assert(Object.keys(response.body).length === 0);
  });
  it('意図したコンテンツを配信している', ()=> {
    assert(response.text.match(/鳥山明先生のKindle化された著書/));
  });

  it('無効なパラメータには404を返す', (done)=> {
    request(app)
      .get('/author/test')
      .end((err, ret)=> {
        assert(err === null);
        assert(ret.status === 404);
        assert(ret.text.match(/ページが見つかりません。/));
        done();
      });
  });

  it('存在しないパラメータには404を返す', (done)=> {
    request(app)
      .get('/author/2')
      .end((err, ret)=> {
        assert(err === null);
        assert(ret.status === 404);
        assert(ret.text.match(/ページが見つかりません。/));
        done();
      });
  });
});
