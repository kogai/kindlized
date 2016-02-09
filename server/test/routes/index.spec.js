import assert from 'power-assert';
import request from 'supertest';
import session from 'supertest-session';
import app from 'app.js';
import UserModel from 'models/User';

describe('/routes/mail', ()=> {
  let appSession;
  beforeEach(()=> {
    appSession = session(app);
  });
  it('未ログイン状態ではログインページにリダイレクトされる', (done)=> {
    request(app).get('/').end((err, ret)=> {
      assert(ret.status === 303);
      assert(ret.redirect === true);
      assert(ret.header.location === '/account/login');
      done();
    });
  });

  it('ログイン状態ではリダイレクトされない', (done)=> {
    const account = {
      mail: 'dragonball@jump.com',
      password: 'wakuwakusitekitazo',
    };
    const user = new UserModel(account);
    user.save(()=> {
      appSession
        .post('/account/login')
        .send(account)
        .end(()=> {
          appSession.get('/').end((err, ret)=> {
            assert(ret.status === 200);
            assert(ret.redirect === false);
            assert(ret.text.match(/ホーム\ \|\ kindle化した書籍の通知サービス/));
            done();
          });
        });
    });
  });
});
