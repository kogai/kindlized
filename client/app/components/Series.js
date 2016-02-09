/** @jsx element */

import { element } from 'deku';

// import { editInput } from 'app/actionCreators/edit';
import { toggleSeries, editSeries, inputEditSeries, deleteSeries } from 'app/actionCreators/series';
import { objectToCss } from 'app/utils';

import InputBox from 'app/components/InputBox';

const listStyle = objectToCss({
  display: 'flex',
  alignItems: 'center',
});

const buttonsStyle = objectToCss({
  flex: 2,
  textAlign: 'right',
});

const buttonStyle = objectToCss({
  marginLeft: '6px',
  fontSize: '14px',
});

function render({ dispatch, props }) {
  return (
    <li class="list-group-item">
      {
        props.isEditing ?
        <InputBox
          placeholder={ props.name }
          name="編集"
          onClick={ editSeries } onInput={ inputEditSeries }
          editable={ props }
          index={ props.index }
          type="edit"
          icon="edit"
        /> :
        <div style={ listStyle }>
          { props.name }
          <div style={ buttonsStyle }>
            <button
              style={ buttonStyle } class="btn btn-default btn-sm"
              onClick={ toggleSeries(dispatch, props) }
            >
              <i class="fa fa-edit fa-fw"></i>編集
            </button>
            <button style={ buttonStyle } class="btn btn-default btn-sm"
              onClick={ deleteSeries(dispatch, props) }
            >
              <i class="fa fa-minus fa-fw"></i>削除
            </button>
          </div>
        </div>
      }
    </li>
  );
}

export default {
  render,
};
