global.jQuery = require("jquery");
require('jquery-validate');
var validator = {};

validator.regist = jQuery( "#regist-wrap" ).validate({
	rules: {
		mail : {
			required : true,
			email : true
		},
		pwd : {
			required : true,
			minlength : 8
		}
	},
	messages : {
		mail : {
			required : '入力必須項目です',
			email : 'メールアドレスを入力して下さい'
		},
		pwd : {
			required : '入力必須項目です',
			minlength : jQuery.validator.format('{0}文字以上のパスワードを設定して下さい')
		}
	},
	errorClass : 'alert-danger alert',
	errorLabelContainer : '.alert-wrap',
	wrapper : 'div',
	errorElement : 'span'
});

validator.login = jQuery( "#login-wrap" ).validate({
	rules: {
		mail : {
			required : true,
			email : true
		},
		pwd : {
			required : true
		}
	},
	messages : {
		mail : {
			required : '入力必須項目です',
			email : 'メールアドレスを入力して下さい'
		},
		pwd : {
			required : '入力必須項目です'
		}
	},
	errorClass : 'alert-danger alert',
	errorLabelContainer : '.alert-wrap',
	wrapper : 'div',
	errorElement : 'span'
});
module.exports = validator;