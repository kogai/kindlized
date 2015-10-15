import assert from 'power-assert';
import mockgoose from 'mockgoose';
import Promise from 'bluebird';
import UserModel from 'models/User';

describe('/models/User', ()=> {
  afterEach(()=> {
    mockgoose.reset();
  });

  it('同一のメールアドレスは登録できない', (done)=> {
    const accounts = [
      { mail: 'dragonball@jump.com', password: 'wakuwakusitekitazo' },
      { mail: 'dragonball@jump.com', password: 'wakuwakusitekitazo' },
    ];
    Promise.map(accounts, (account)=> {
      return new Promise((resolve, reject)=> {
        const user = new UserModel(account);
        user.save((saveError)=> {
          if (saveError) {
            return reject(saveError);
          }
          resolve();
        });
      });
    })
    .catch((error)=> {
      assert(error.name === 'MongoError');
      assert(error.code === 11000);
      assert(error.errmsg === 'E11000 duplicate key error index: mail');
    })
    .finally(done);
  });

  it('パスワードは暗号化されて保存される', (done)=> {
    const accountInput = {
      mail: 'yuyuhakusho@jump.com',
      password: 'datenianoyoha',
    };
    const account = new UserModel(accountInput);
    account.save((saveError)=> {
      assert(saveError === null);
      UserModel.find({}, (queryError, users)=> {
        assert(queryError === null);
        assert(users[0].mail === account.mail);
        assert(users[0].password !== accountInput.password);
        assert(users[0].password === account.password);
        assert(users[0].password.length === 60);
        done();
      });
    });
  });

  it('パスワードは照合できる', (done)=> {
    const accountInput = {
      mail: 'slumdunk@jump.com',
      password: 'tensaidesukara',
    };
    const account = new UserModel(accountInput);
    account.save((saveError)=> {
      assert(saveError === null);
      account.comparePassword(accountInput.password, account.password, (matchError, isMatch)=> {
        assert(matchError === null);
        assert(isMatch);
        done();
      });
    });
  });

  it('パスワードが同一でも異なったハッシュが生成される', (done)=> {
    const accounts = [
      { mail: 'toguroani@jump.com', password: 'toguroteam' },
      { mail: 'togurootouto@jump.com', password: 'toguroteam' },
    ];
    Promise.map(accounts, (account)=> {
      return new Promise((resolve, reject)=> {
        const user = new UserModel(account);
        user.save((saveError)=> {
          if (saveError) {
            return reject(saveError);
          }
          resolve();
        });
      });
    })
    .then(()=> {
      UserModel.find({}, (queryError, users)=> {
        assert(queryError === null);
        assert(users[0].password !== users[1].password);
        done();
      });
    });
  });
});
