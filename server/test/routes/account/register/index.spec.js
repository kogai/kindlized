import assert from 'power-assert';
import mockgoose from 'mockgoose';

import UserModel from 'models/User';

import {
  getReq,
  postReq,
  loginReq,
} from 'test/helper/request';
import {
  defaultAccount,
  createAndRegisterBookList,
} from 'test/helper/user';

const uri = '/account/register';
const account = {
  mail: `0-${defaultAccount.mail}`,
  password: `0-${defaultAccount.password}`,
};

describe('/routes/account/register', function withTimeout() {
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
      assert(ret.text.match(/アカウント登録\ \|\ kindle化した書籍の通知サービス/));
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

  it('正しい入力でアカウントが登録できる', (done)=> {
    const newAccount = {
      mail: 'ushiototora@sunday.com',
      password: 'moukuttasa',
    };
    postReq(uri, newAccount).then(({err, ret})=> {
      assert(err === null);
      assert(ret.status === 200);
      assert(ret.text.match(/アカウントの登録に成功しました。\n登録したメールアドレスに確認メールを送信しています/));
      UserModel.findOne({mail: newAccount.mail}, (_, user)=> {
        assert(user.mail === newAccount.mail);
        assert(user.isVerified === false);
        done();
      });
    });
  });

  it('既にアカウントが存在しているメールアドレスではアカウントが登録できない', (done)=> {
    postReq(uri, account).then(({err, ret})=> {
      assert(err === null);
      assert(ret.status === 403);
      assert(ret.text.match(/アカウントの登録に失敗しました。\n登録済みのメールアドレスです。/));
      done();
    });
  });

  it('誤った形式の入力ではアカウントが登録できない', (done)=> {
    const invalidAccount = {
      mail: 'ushiototorasundaycom',
      password: 'moukuttasa',
    };
    postReq(uri, invalidAccount).then(({err, ret})=> {
      assert(err === null);
      assert(ret.status === 403);
      assert(ret.text.match(/アカウントの登録に失敗しました。\nメールアドレスの形式が誤っています。/));
      done();
    });
  });
});
