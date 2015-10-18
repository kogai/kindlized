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
const payload = { ASIN: `15-${defaultBook.ASIN}` };
const conditions = { mail: `0-${defaultAccount.mail}`};

describe('/routes/register', function withTimeout() {
  this.timeout(5000);
  beforeEach((done)=> {
    createAndRegisterBookList(5, false).then(done);
  });
  afterEach(()=> {
    mockgoose.reset();
  });

  it('未ログイン状態ではログインページにリダイレクトされる', (done)=> {
    getReq(uri).then(({err, ret})=> {
      assert(err === null);
      assert(ret.status === 303);
      assert(ret.redirect === true);
      assert(ret.header.location === '/account/login');
      done();
    });
  });

  it('クエリを持たないリクエストはリダイレクトされる', (done)=> {
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

  it.only('ログイン状態ではリダイレクトされない', (done)=> {
    loginReq().then((appSession)=> {
      appSession
      .get(uri)
      .query(payload)
      .end((err, ret)=> {
        assert(err === null);
        assert(ret.status === 200);
        assert(ret.redirect === false);
        assert(ret.text.match(/通知登録完了\ \|\ kindle化した書籍の通知サービス/));
        done();
      });
    });
  });

  it('ASINクエリを持たないリクエストはリダイレクトされる', (done)=> {
    const invalidPayload = { title: 'invalidpayload' };
    loginReq().then((appSession)=> {
      appSession
      .get(uri)
      .query(invalidPayload)
      .end((err, ret)=> {
        assert(err === null);
        assert(ret.status === 303);
        assert(ret.redirect === true);
        assert(ret.header.location === '/');
        done();
      });
    });
  });

  it('クエリに持った書籍が登録できる', (done)=> {
    loginReq().then((appSession)=> {
      appSession
      .get(uri)
      .query(payload)
      .end(()=> {
        UserModel.findOne(conditions, (_, user)=> {
          assert(user.bookList.length === 16);
          const hasAddedBooks = user.bookList.filter((book)=> {
            if (book.title === `15-${defaultBook.title}`) {
              return book;
            }
          });
          assert(hasAddedBooks.length === 1);
          assert(hasAddedBooks[0].title === `15-${defaultBook.title}`);
          assert(typeof hasAddedBooks[0].isNotified === 'boolean');
          assert(typeof hasAddedBooks[0].bookId === 'object');
          done();
        });
      });
    });
  });
});
