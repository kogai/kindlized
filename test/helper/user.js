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

function createAndRegisterBookList(numberOfUsers = 10) {
  return new Promise((registerResolve)=> {
    createAndFindUsers(numberOfUsers)
    .then((users)=> {
      createAndFindBooks(numberOfUsers)
      .then((books)=> {
        Promise.reduce(users, (total, user)=> {
          const UserUtils = User(user._id.toString());
          return new Promise((updatesResolve)=> {
            Promise.reduce(filterKindlized(books), (totalbook, book)=> {
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
  createUser,
  createUsers,
  createAndFindUsers,
  createAndRegisterBookList,
};

/*
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
*/
