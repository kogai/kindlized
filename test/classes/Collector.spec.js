import assert from 'power-assert';
import mockgoose from 'mockgoose';
import Collector from 'classes/Collector';
const AuthorCollector = Collector('author');

describe('/classes/Collector', ()=> {
  it('著者を保存できる', (done)=> {
    const author = '井上雄彦';
    AuthorCollector.save(author, (err, savedAuthor)=> {
      assert(err === null);
      assert(savedAuthor.pageId === 1);
      done();
    });
  });
  it('著者を同時に保存できる', (done)=> {
    const authors = ['井上雄彦', '冨樫義博', '森田まさのり'];
    AuthorCollector.saveCollections(authors, (err, savedAuthors)=> {
      assert(err === null);
      assert(savedAuthors.length === 3);
      assert(savedAuthors[0].pageId === 1);
      assert(savedAuthors[1].pageId === 2);
      assert(savedAuthors[2].pageId === 3);
      done();
    });
  });

  afterEach(()=> {
    mockgoose.reset();
  });
});
