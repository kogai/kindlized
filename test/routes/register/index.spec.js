import assert from 'power-assert';
import mockgoose from 'mockgoose';
import {
  getReq,
  loginReq,
} from 'test/helper/request';
import {
  defaultAccount,
  createAndRegisterBookList,
} from 'test/helper/user';
import { defaultBook } from 'test/helper/book';
import UserModel from 'models/User';

const uri = '/register';

describe('/routes/register', function withTimeout() {
  this.timeout(5000);
  beforeEach((done)=> {
    createAndRegisterBookList(5, false).then(done);
  });
  afterEach(()=> {
    mockgoose.reset();
  });

  it.only('未ログイン状態ではログインページにリダイレクトされる', (done)=> {
    getReq(uri).then(({err, ret})=> {
      assert(err === null);
      assert(ret.status === 303);
      assert(ret.redirect === true);
      assert(ret.header.location === '/account/login');
      done();
    });
  });

  it('ログイン状態ではリダイレクトされない', (done)=> {
    loginReq().then((appSession)=> {
      appSession
      .get(uri)
      .end((err, ret)=> {
        assert(err === null);
        assert(ret.status === 200);
        assert(ret.redirect === false);
        assert(ret.text.match(/通知登録完了\ \|\ kindle化した書籍の通知サービス/));
        done();
      });
    });
  });

  it('クエリに持った書籍が登録できる', (done)=> {
    const payload = { query: `0-${defaultBook.title} (10)` };
    const conditions = { mail: `0-${defaultAccount.mail}`};

    loginReq().then((appSession)=> {
      appSession
      .get(uri)
      .query(payload)
      .end(()=> {
        UserModel.findOne(conditions, (_, user)=> {
          assert(user.seriesList.length === 1);
          assert(user.seriesList[0].seriesKeyword === `0-${defaultBook.title}`);
          done();
        });
      });
    });
  });
});
