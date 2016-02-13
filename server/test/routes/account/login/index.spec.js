import assert from 'power-assert';
import mockgoose from 'mockgoose';

import {
  getReq,
  postReq,
  loginReq,
} from 'test/helper/request';
import {
  defaultAccount,
  createAndRegisterBookList,
} from 'test/helper/user';

const uri = '/account/login';
const account = {
  mail: `0-${defaultAccount.mail}`,
  password: `0-${defaultAccount.password}`,
};

describe('/routes/account/login', function withTimeout() {
  this.timeout(5000);
  beforeEach((done)=> {
    createAndRegisterBookList(5, false).then(done);
  });
  afterEach(()=> {
    mockgoose.reset();
  });

  it('意図したコンテンツを配信している', (done)=> {
    getReq(uri).then(({err, ret})=> {
      assert(err === null);
      assert(ret.status === 200);
      assert(ret.redirect === false);
      assert(ret.text.match(/ログイン\ \|\ kindle化した書籍の通知サービス/));
      done();
    });
  });

  it('ログイン状態ではリダイレクトされる', (done)=> {
    loginReq().then((appSession)=> {
      appSession
      .get(uri)
      .end((err, ret)=> {
        assert(err === null);
        assert(ret.status === 303);
        assert(ret.redirect === true);
        assert(ret.header.location === '/');
        done();
      });
    });
  });

  it('正しい入力でログインできる', (done)=> {
    postReq(uri, account).then(({err, ret})=> {
      assert(err === null);
      assert(ret.status === 302);
      assert(ret.redirect === true);
      assert(ret.header.location === '/');
      done();
    });
  });

  it('誤ったパスワードではログインできない', (done)=> {
    const invalidAccount = Object.create(account);
    invalidAccount.password = `1-${defaultAccount.password}`;
    postReq(uri, invalidAccount).then(({err, ret})=> {
      assert(err === null);
      assert(ret.status === 302);
      assert(ret.redirect === true);
      assert(ret.header.location === '/account/fail');
      done();
    });
  });

  it('存在しないアカウントのメールアドレスではログインできない', (done)=> {
    const invalidAccount = Object.create(account);
    invalidAccount.mail = 'isNotExist@test.com';
    postReq(uri, invalidAccount).then(({err, ret})=> {
      assert(err === null);
      assert(ret.status === 302);
      assert(ret.redirect === true);
      assert(ret.header.location === '/account/fail');
      done();
    });
  });
});
