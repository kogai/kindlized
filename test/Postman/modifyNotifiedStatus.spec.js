import assert from 'power-assert';
import Promise from 'bluebird';
import mockgoose from 'mockgoose';
import Collector from 'classes/Collector';
import User from 'common/User';
import BookModel from 'models/Book';
import UserModel from 'models/User';
import modifyNotifiedStatus from 'Postman/lib/modifyNotifiedStatus';
// kindlizedList kindle化されたBookコレクション

const BookCollector = Collector('book');

describe('/Postman/lib/modifyNotifiedStatus', ()=> {
  beforeEach((done)=> {
    const books = [
      {
        ASIN: 'BASKETBALL',
        author: '井上雄彦',
        title: 'SLAM DUNK',
        isKindlized: true,
      }, {
        ASIN: 'KURAIYAGARE',
        author: '冨樫義博',
        title: '幽☆遊☆白書',
        isKindlized: true,
      }, {
        ASIN: 'ROKUDENASI',
        author: '森田まさのり',
        title: 'ろくでなしBLUES',
        isKindlized: true,
      },
    ];
    BookCollector.saveCollections(books, (saveError, savedBooks)=> {
      const user = new UserModel({
        mail: 'yuyuhakusho@jump.com',
        password: 'datenianoyoha',
      });

      user.save((err, savedUser)=> {
        const UserUtils = User(savedUser._id.toString());
        Promise.reduce(savedBooks, (total, item)=> {
          return new Promise((resolve)=> {
            UserUtils.saveBook(item, resolve);
          });
        }, null)
        .then(()=> {
          done();
        });
      });
    });
  });

  it('メール配信後にステータスが更新される', (done)=> {
    UserModel.find({}, (err, users)=> {
      BookModel.find({}, (bookError, books)=> {
        users[0].kindlizedList = books;
        modifyNotifiedStatus(users[0])
        .then(()=> {
          UserModel.find({}, (modifiedError, modifiedUsers)=> {
            console.log(modifiedUsers);
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
    BookModel.find({}, (findError, books)=> {
      const user = new UserModel({
        mail: 'slumdunk@jump.com',
        password: 'tensaidesukara',
      });

      user.save((saveError, savedUser)=> {
        const UserUtils = User(savedUser._id.toString());
        Promise.reduce(books, (total, item)=> {
          return new Promise((resolve)=> {
            UserUtils.saveBook(item, resolve);
          });
        }, null)
        .then(()=> {
          UserModel.find({}, (err, users)=> {
            BookModel.find({}, (bookError2, books2)=> {
              users[0].kindlizedList = books2;
              modifyNotifiedStatus(users[0])
              .then(()=> {
                UserModel.find({}, (modifiedError, modifiedUsers)=> {
                  console.log(modifiedUsers);
                  assert(modifiedUsers[0].bookList[0].isNotified === true);
                  assert(modifiedUsers[0].bookList[1].isNotified === true);
                  assert(modifiedUsers[0].bookList[2].isNotified === true);
                  done();
                });
              });
            });
          });
        });
      });
    });
  });

  afterEach(()=> {
    mockgoose.reset();
  });
});
