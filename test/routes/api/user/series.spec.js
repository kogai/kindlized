import assert from 'power-assert';
import mockgoose from 'mockgoose';
import Promise from 'bluebird';
import UserModel from 'models/User';
import {
  loginReq,
} from 'test/helper/request';
import {
  defaultAccount,
  createAndRegisterBookList,
} from 'test/helper/user';
import { defaultBook } from 'test/helper/book';

const endpoint = '/api/user/series';

describe('/routes/api/user/book', function withTimeout() {
  this.timeout(5000);
  beforeEach((done)=> {
    createAndRegisterBookList(5, false).then(done);
  });

  afterEach(()=> {
    mockgoose.reset();
  });

  it('シリーズが保存できる', (done)=> {
    const payload = { query: `0-${defaultBook.title} (10)` };
    const conditions = { mail: `0-${defaultAccount.mail}`};

    loginReq()
    .then((appSession)=> {
      appSession.post(endpoint).send(payload).end((err, ret)=> {
        assert(err === null);
        assert(ret.status === 200);
        UserModel.findOne(conditions, (_, user)=> {
          assert(user.seriesList.length === 1);
          assert(user.seriesList[0].seriesKeyword === `0-${defaultBook.title}`);
          done();
        });
      });
    });
  });

  it('シリーズが削除できる', (done)=> {
    const payload = { query: `0-${defaultBook.title} (10)` };
    const conditions = { mail: `0-${defaultAccount.mail}`};
    let appSession;

    loginReq()
    .then((_appSession)=> {
      appSession = _appSession;
      return new Promise((resolve)=> {
        appSession.post(endpoint).send(payload).end(resolve);
      });
    })
    .then(()=> {
      const deletePayload = { query: `0-${defaultBook.title}` };
      return new Promise((resolve)=> {
        appSession.delete(endpoint).send(deletePayload).end((err, ret)=> {
          assert(err === null);
          assert(ret.status === 200);
          resolve();
        });
      });
    })
    .then(()=> {
      UserModel.findOne(conditions, (_, user)=> {
        assert(user.seriesList.length === 0);
        done();
      });
    });
  });
});
