import assert from 'power-assert';
import request from 'supertest';
import app from 'app.js';

describe('/routes/mail', ()=> {
  it('未ログイン状態ではログインページにリダイレクトされる', (done)=> {
    request(app).get('/').end((err, ret)=> {
      assert(ret.status === 303);
      assert(ret.redirect === true);
      assert(ret.header.location === '/account/login');
      done();
    });
  });
});
