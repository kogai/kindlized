import Q from 'q';
import promiseSerialize from'common/promiseSerialize';

describe('common/promiseSerialize.jsのテスト', ()=> {
  let testCount = 0;
  let itArray;
  const testArry = [];
  let index;
  for (index = 0; index < 10; index++) {
    testArry.push(index);
  }
  const testFunc = (arrayElement)=> {
    const deffered = Q.defer();
    arrayElement = arrayElement * arrayElement;
    setTimeout(()=> {
      testCount++;
      deffered.resolve(arrayElement);
    }, 100 );
    return deffered.promise;
  };

  before((done)=> {
    promiseSerialize( testArry, testFunc )
    .done((data)=> {
      itArray = data.resultArray;
      done();
    });
  });

  it('渡した配列のlength回だけ再帰処理をしている', ()=> {
    testCount.should.be.exactly(10);
  });

  it('処理が完了するとcallbackで処理した配列の要素をresolveする', ()=> {
    let count = 0;
    itArray.forEach((ele)=> {
      ele.should.be.exactly( count * count);
      count++;
    });
  });
});
