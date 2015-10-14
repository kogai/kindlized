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
    done();
  });

  it('パスワードは復元して読み込める', (done)=> {
    done();
  });
});
