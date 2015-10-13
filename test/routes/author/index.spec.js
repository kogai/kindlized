import assert from 'power-assert';
import request from 'supertest';
import app from 'app.js';

describe('routes:author', ()=> {
  let response;
  before((done)=> {
    request(app)
      .get('/author/1000')
      .end((err, ret)=> {
        if (err) {
          return done(err);
        }
        response = ret;
        done();
      });
  });

  it('200を返す', ()=> {
    assert(response.status === 200);
  });
  it('リダイレクトされていない', ()=> {
    assert(response.redirect === false);
  });
  it('x-powered-byを送信していてる', ()=> {
    assert(response.header['x-powered-by'] === 'Express');
  });
  it('text/htmlを送信していてる', ()=> {
    assert(response.header['content-type'] === 'text/html; charset=utf-8');
  });
  it('APIエンドポイントではない', ()=> {
    assert(Object.keys(response.body).length === 0);
  });
  it('意図したコンテンツを配信している', ()=> {
    assert(response.text.match(/未森ちや先生のKindle化された著書/));
  });
});
