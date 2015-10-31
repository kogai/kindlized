import assert from 'power-assert';
import mockgoose from 'mockgoose';
// import escape from 'escape-regexp';
import {
  getReq,
  // loginReq,
} from 'test/helper/request';
import {
  // defaultAccount,
  createAndRegisterBookList,
} from 'test/helper/user';
// import { defaultBook } from 'test/helper/book';
// import UserModel from 'models/User';

const uri = '/account/login';
// const payload = { ASIN: `15-${defaultBook.ASIN}` };
// const conditions = { mail: `0-${defaultAccount.mail}`};

describe('/routes/account/login', function withTimeout() {
  this.timeout(5000);
  beforeEach((done)=> {
    createAndRegisterBookList(5, false).then(done);
  });
  afterEach(()=> {
    mockgoose.reset();
  });

  it.only('意図したコンテンツを配信している', (done)=> {
    getReq(uri).then(({err, ret})=> {
      assert(err === null);
      assert(ret.status === 200);
      assert(ret.redirect === false);
      assert(ret.text.match(/ログイン\ \|\ kindle化した書籍の通知サービス/));
      done();
    });
  });

  it('ログイン状態ではリダイレクトされる', (done)=> {
    done();
  });
});
