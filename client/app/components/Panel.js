/** @jsx element */

import { element } from 'deku';

import { objectToCss } from 'app/utils';
import Loading from 'app/components/Loading';
import { registerBook, unRegisterBook } from 'app/actionCreators/books';

const loadingStyle = objectToCss({
  paddingBottom: '14px',
});

function render({ props, dispatch }) {
  return (
    <li class="col-sm-8 col-md-3" style= { props.pannelStyle }>
      {
        props.isLoading ?
        <div class="thumbnail" style={ loadingStyle }>
          <Loading isLoading={ props.isLoading } />
        </div> :
        <div class="thumbnail">
          <a href={ props.url } target="_blank" style={ props.imgStyle }>
            <img src={ props.imgSrc } alt={ props.title } />
          </a>
          <div class="caption">
            <h5 style={ props.titleStyle }>{ props.title }</h5>
            {
              props.isKindlized ?
              <span class="label label-success">kindle化されています</span> :
              <span class="label label-danger">kindle化されていません</span>
            }
            <a
              href={ props.url }
              target="_blank"
              class="btn btn-default btn-sm"
              style={ props.buttonStyle }
            >
              Amazonで購入する
            </a>
            {
              props.isRegisterd ?
              <button
                onClick={ registerBook(dispatch, props) }
                class="btn btn-info btn-xs"
              >メール通知登録</button> :
              <button
                onClick={ unRegisterBook(dispatch, props) }
                class="btn btn-warning btn-xs"
              >通知を解除</button>
            }
          </div>
        </div>
      }
    </li>
  );
}

export default {
  render,
};
