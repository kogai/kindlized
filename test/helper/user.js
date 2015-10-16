import Promise from 'bluebird';
import UserModel from 'models/User';

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

function createUsers(numberOfUsers = 100) {
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

function createAndFindUsers(numberOfUsers = 100) {
  return new Promise((resolve)=> {
    createUsers(numberOfUsers)
      .then(()=> {
        UserModel.find({}, (err, users)=> {
          resolve(users);
        });
      });
  });
}

export {
  createUser,
  createUsers,
  createAndFindUsers,
};
