/** @jsx element */

import { element } from 'deku';

import { addSeries, inputAddSeries } from 'app/actionCreators/series';
import { objectToCss } from 'app/utils';

import Layout from 'app/components/Layout';
import InputBox from 'app/components/InputBox';
import SeriesList from 'app/components/SeriesList';

import {
  render,
  store,
} from 'app/index';

const inputBoxStyle = objectToCss({
  margin: '20px 40px',
  marginBottom: '30px',
});

function main() {
  render(
    <Layout activePath="/series" >
      <div style={ inputBoxStyle }>
        <InputBox
          placeholder="通知を受けたいシリーズを追加する"
          name="追加"
          editable={ store.getState().series }
          onClick={ addSeries } onInput={ inputAddSeries }
          type="series"
          icon="plus"
        />
      </div>
      <SeriesList />
    </Layout>,
    store.getState()
  );
}

main();
store.subscribe(main);
