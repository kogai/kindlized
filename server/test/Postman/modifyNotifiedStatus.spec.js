import assert from 'power-assert';
import mockgoose from 'mockgoose';
import UserModel from 'models/User';
import BookModel from 'models/Book';
import modifyNotifiedStatus from 'Postman/lib/modifyNotifiedStatus';
import { createAndRegisterBookList } from 'test/helper/user';

describe('/Postman/lib/modifyNotifiedStatus', function withTimeout() {
  this.timeout(5000);
  beforeEach((done)=> {
    createAndRegisterBookList(5).then(done);
  });

  it('メール配信後にステータスが更新される', (done)=> {
    UserModel.find({}, (err, users)=> {
      BookModel.find({ isKindlized: true }, (bookError, books)=> {
        users[0].kindlizedList = books;
        modifyNotifiedStatus(users[0])
        .then(()=> {
          UserModel.find({}, (modifiedError, modifiedUsers)=> {
            assert(modifiedUsers[0].bookList[0].isNotified === true);
            assert(modifiedUsers[0].bookList[1].isNotified === true);
            assert(modifiedUsers[0].bookList[2].isNotified === true);
            done();
          });
        });
      });
    });
  });

  it('複数のユーザーにメール配信後にステータスが更新される', (done)=> {
    UserModel.find({}, (err, users)=> {
      BookModel.find({ isKindlized: true }, (bookError, books)=> {
        const notifyUsers = users.map((user)=> {
          user.kindlizedList = books;
          return user;
        });
        Promise.all(notifyUsers.map((user)=> {
          return new Promise(resolve => modifyNotifiedStatus(user).then(resolve));
        }))
        .then(()=> {
          UserModel.find({}, (modifiedError, modifiedUsers)=> {
            assert(modifiedUsers[0].bookList[0].isNotified === true);
            assert(modifiedUsers[0].bookList[1].isNotified === true);
            assert(modifiedUsers[0].bookList[2].isNotified === true);
            assert(modifiedUsers[1].bookList[0].isNotified === true);
            assert(modifiedUsers[1].bookList[1].isNotified === true);
            assert(modifiedUsers[1].bookList[2].isNotified === true);
            assert(modifiedUsers[2].bookList[0].isNotified === true);
            assert(modifiedUsers[2].bookList[1].isNotified === true);
            assert(modifiedUsers[2].bookList[2].isNotified === true);
            done();
          });
        });
      });
    });
  });

  afterEach(()=> {
    mockgoose.reset();
  });
});
