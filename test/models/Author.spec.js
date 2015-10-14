import assert from 'power-assert';
import mockgoose from 'mockgoose';
import Promise from 'bluebird';
import AutherModel from 'models/Author';

describe('/models/Author', ()=> {
  afterEach(()=> {
    mockgoose.reset();
  });

  it('Authorコレクションは自動で付与されたpageIDを持つ', (done)=> {
    const author = new AutherModel({
      name: '和月伸宏',
      lastModified: new Date(),
    });
    author.save((saveError)=> {
      if (saveError) {
        return done(saveError);
      }
      AutherModel.find({}, (findError, authors)=> {
        assert(findError === null);
        assert(authors.length === 1);
        assert(authors[0].pageId === 1);
        done();
      });
    });
  });

  it('pageIDはAuthorコレクションを追加する度に増加する', (done)=> {
    const authors = ['井上雄彦', '冨樫義博', '森田まさのり'];
    Promise.reduce(authors, (total, item)=> {
      const author = new AutherModel({
        name: item,
        lastModified: new Date(),
      });
      return new Promise((resolve, reject)=> {
        author.save((saveError)=> {
          if (saveError) {
            return reject(saveError);
          }
          resolve(author);
        });
      });
    }, null)
    .then(()=> {
      AutherModel.find({}, (findError, savedAuthors)=> {
        assert(findError === null);
        assert(savedAuthors.length === 3);
        assert(savedAuthors[0].pageId === 1);
        assert(savedAuthors[1].pageId === 2);
        assert(savedAuthors[2].pageId === 3);
        done();
      });
    });
  });

  it('Authorコレクションは並列に保存出来ない', (done)=> {
    const authors = ['井上雄彦', '冨樫義博', '森田まさのり'].map((authorName) => {
      return new Promise((resolve, reject)=> {
        const author = new AutherModel({
          name: authorName,
          lastModified: new Date(),
        });
        author.save((saveError)=> {
          if (saveError) {
            return reject(saveError);
          }
          resolve();
        });
      });
    });

    Promise.all(authors)
      .then(()=> {
        AutherModel.find({}, (findError, savedAuthors)=> {
          assert(findError === null);
          assert(savedAuthors.length === 3);
          assert(savedAuthors[0].pageId === 1);
          assert(savedAuthors[1].pageId === 1);
          assert(savedAuthors[2].pageId === 1);
          done();
        });
      });
  });
});
