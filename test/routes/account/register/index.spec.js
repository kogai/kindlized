import assert from 'power-assert';
import mockgoose from 'mockgoose';

import {
  getReq,
} from 'test/helper/request';
import {
  createAndRegisterBookList,
} from 'test/helper/user';

const uri = '/account/register';

describe('/routes/account/register', function withTimeout() {
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
      assert(ret.text.match(/アカウント登録\ \|\ kindle化した書籍の通知サービス/));
      done();
    });
  });

  it('ログイン状態ではリダイレクトされる', (done)=> {
    done();
  });
});
