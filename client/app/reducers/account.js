import {
  LOG_OUT, EMAIL_RECIEVE,
  EMAIL_INPUT, EMAIL_MODIFY,
} from 'app/actionCreators/actionTypes';

const initialState = {
  isLogin: true,
  mailAddress: '',
  textContainer: '',
  isValid: false,
  button: [
    {
      name: 'ログイン',
      link: '/account/login',
      methodName: null,
      class: 'default',
      isLogin: false,
    },
    {
      name: 'アカウント作成',
      link: '/account/register',
      methodName: null,
      class: 'primary',
      isLogin: false,
    },
    {
      name: 'ログアウト',
      link: null,
      methodName: 'logout',
      class: 'default',
      isLogin: true,
    },
  ],
};

export default function editReducer(state = initialState, action) {
  switch (action.type) {
    case EMAIL_RECIEVE:
      return Object.assign({}, state, {
        mailAddress: action.body.mailAddress,
      });

    case EMAIL_INPUT:
      return Object.assign({}, state, {
        textContainer: action.body.textContainer,
        isValid: action.body.isValid,
      });

    case EMAIL_MODIFY:
      return Object.assign({}, state, {
        mailAddress: state.textContainer,
        textContainer: initialState.textContainer,
      });

    case LOG_OUT:
      return location.reload();

    default:
      return state;
  }
}
