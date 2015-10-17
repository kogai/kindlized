import assert from 'power-assert';
import mockgoose from 'mockgoose';
import {
  getReq,
  loginReq,
} from 'test/helper/request';
import { createAndRegisterBookList } from 'test/helper/user';
import { defaultBook } from 'test/helper/book';

const endpoint = '/api/user/book';

describe('/routes/api/user/book', function withTimeout() {
  this.timeout(5000);
  beforeEach((done)=> {
    createAndRegisterBookList(5, false).then(done);
  });

  afterEach(()=> {
    mockgoose.reset();
  });

  it('ログインしていないと書籍を取得できない', (done)=> {
    getReq(endpoint).then(({ ret })=> {
      assert(ret.status === 500);
      done();
    });
  });

  it('登録した書籍が全件取得できる', (done)=> {
    loginReq()
    .then((appSession)=> {
      appSession.get(endpoint).end((err, ret)=> {
        assert(ret.status === 200);
        assert(ret.body.books.length === 15);
        assert(ret.body.maxCount === 15);
        assert(ret.body.books[0].title === `0-${defaultBook.title}`);
        assert(ret.body.books[1].title === `1-${defaultBook.title}`);
        assert(ret.body.books[2].title === `10-${defaultBook.title}`);
        assert(ret.body.books[3].title === `11-${defaultBook.title}`);
        assert(ret.body.books[4].title === `12-${defaultBook.title}`);
        done();
      });
    });
  });

  it('登録した書籍がページ毎に取得できる', (done)=> {
    const queries = { page: 2 };
    loginReq()
    .then((appSession)=> {
      appSession.get(endpoint).query(queries).end((err, ret)=> {
        assert(ret.status === 200);
        assert(ret.body.books.length === 5);
        assert(ret.body.maxCount === 15);
        assert(ret.body.books[0].title === `5-${defaultBook.title}`);
        assert(ret.body.books[1].title === `6-${defaultBook.title}`);
        assert(ret.body.books[2].title === `7-${defaultBook.title}`);
        assert(ret.body.books[3].title === `8-${defaultBook.title}`);
        assert(ret.body.books[4].title === `9-${defaultBook.title}`);
        done();
      });
    });
  });

/*
  it.only('通知済みの書籍は取得されない', (done)=> {
  });

  it.only('書籍が保存できる', (done)=> {
  });

  it.only('書籍が削除できる', (done)=> {
  });
*/
});
