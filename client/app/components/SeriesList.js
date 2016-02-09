/** @jsx element */

import { element } from 'deku';

import { fetchSeries } from 'app/actionCreators/series';
import Series from 'app/components/Series';

function onCreate({ dispatch }) {
  fetchSeries(dispatch)();
}

function render({ context }) {
  return (
    <div>
      <h3>通知登録済のシリーズ一覧</h3>
      { context.series.message }
      <ul class="list-group">
        { context.series.books
          .map((s, i)=> <Series
            index={ i }
            textContainer={ s.textContainer }
            name={ s.seriesKeyword }
            isEditing={ s.isEditing }
          />)}
      </ul>
    </div>
  );
}

export default {
  render,
  onCreate,
};
