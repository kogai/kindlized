import assert from 'power-assert';
import mockgoose from 'mockgoose';
import UserModel from 'models/User';
import {
  // getReq,
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

  it.only('シリーズが保存できる', (done)=> {
    const payload = {
      query: `0-${defaultBook.title} (10)`,
    };
    const conditions = { mail: `0-${defaultAccount.mail}`};

    loginReq()
    .then((appSession)=> {
      appSession.post(endpoint).send(payload).end(()=> {
        UserModel.findOne(conditions, (_, user)=> {
          assert(user.seriesList.length === 1);
          assert(user.seriesList[0].seriesKeyword === `0-${defaultBook.title}`);
          done();
        });
      });
    });
  });

  /*
  it('シリーズが削除できる', (done)=> {
  });
  */
});
