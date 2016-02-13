import Promise from 'bluebird';
import UserModel from 'models/User';
import User from 'common/User';
import { createAndFindBooks } from 'test/helper/book';

const defaultAccount = {
  mail: 'dragonball@jump.com',
  password: 'wakuwakusitekitazo',
};

function createUser(account = defaultAccount) {
  const user = new UserModel(account);
  return new Promise((resolve)=> {
    user.save(resolve);
  });
}

function createUsers(numberOfUsers = 10) {
  const users = Array.from(new Array(numberOfUsers), (value, index) => index);
  return Promise.reduce(users, (total, userIndex)=> {
    return new Promise((resolve)=> {
      createUser({
        mail: `${userIndex}-${defaultAccount.mail}`,
        password: `${userIndex}-${defaultAccount.password}`,
      })
      .then(resolve);
    });
  }, null);
}

function createAndFindUsers(numberOfUsers = 10) {
  return new Promise((resolve)=> {
    createUsers(numberOfUsers)
      .then(()=> {
        UserModel.find({}, (err, users)=> {
          resolve(users);
        });
      });
  });
}

function filterKindlized(rawBooks) {
  return rawBooks.filter((book)=> {
    if (book.isKindlized) {
      return book;
    }
  });
}

function createAndRegisterBookList(numberOfUsers = 10, onlyKindlized = true) {
  return new Promise((registerResolve)=> {
    createAndFindUsers(numberOfUsers)
    .then((users)=> {
      createAndFindBooks()
      .then((books)=> {
        Promise.reduce(users, (total, user)=> {
          const UserUtils = User(user._id.toString());
          return new Promise((updatesResolve)=> {
            let registerBooks;
            if (onlyKindlized) {
              registerBooks = filterKindlized(books);
            } else {
              registerBooks = books;
            }
            /* ページネーションのテストのため15件の書籍を登録する
            [
              '0-SLAM DUNK', '1-SLAM DUNK', '10-SLAM DUNK', '11-SLAM DUNK', '12-SLAM DUNK',
              '13-SLAM DUNK', '14-SLAM DUNK', '2-SLAM DUNK', '3-SLAM DUNK', '4-SLAM DUNK',
              '5-SLAM DUNK', '6-SLAM DUNK', '7-SLAM DUNK', '8-SLAM DUNK', '9-SLAM DUNK',
            ]
            */
            registerBooks.length = 15;
            Promise.reduce(registerBooks, (totalbook, book)=> {
              return new Promise((resolve)=> {
                UserUtils.saveBook(book, resolve);
              });
            }, null)
            .then(()=> {
              updatesResolve();
            });
          });
        }, null)
        .then(registerResolve);
      });
    });
  });
}

export {
  defaultAccount,
  createUser,
  createUsers,
  createAndFindUsers,
  createAndRegisterBookList,
};
