var Q           = require( 'q' );
var uuid        = require( 'node-uuid' );
var nodemailer  = require('nodemailer');
var modelUser   = require( 'user' );
var makeCredential = require ( 'common/makeCredential' );
var credentialGmail = makeCredential( 'gmail' );

var makeNewUserModel = function( data ){
    var d = Q.defer();

    var verifyId    = uuid.v1();
    var req         = data.req;
    var res         = data.res;
    var mail        = req.body.mail;
    var password    = req.body.password;

    var newUser = new modelUser({
        mail        : mail,
        password    : password,
        verifyId    : verifyId,
        isVerified  : false,
        bookList    : []
    });

    data.verifyId   = verifyId;
    data.mail       = mail;
    data.password   = password;
    data.newUser    = newUser;

    newUser.save( function( err ){
        console.log( res.render );
        if( err ){
            data.isRegisterd = false;
            data.isRegisterdError = err;
            console.log( 'アカウント登録は失敗しました。', err);
        }else{
            console.log( 'アカウント登録が成功しました。' );
            data.isRegisterd = true;
        }
        d.resolve( data );
    });
    return d.promise;
};

var makeMailTemplate = function( data ){
	var d           = Q.defer();
    var req         = data.req;
    var verifyId    = data.verifyId;
    var verifyLink  = req.protocol + '://' + req.get( 'host' ) + "/account/verify?id=" + verifyId;

    var sendHtml = '';
    sendHtml += 'アカウント認証のために以下のURLをクリックして下さい。<br>'
    sendHtml += verifyLink;
    data.verifyLink = verifyLink;
    data.sendHtml = sendHtml;

	d.resolve( data );

	return d.promise;
};

var sendVerifyMail = function( data ){
	var d = Q.defer();
    if( data.isRegisterd ){
        var mail = data.mail;
        var sendHtml = data.sendHtml;

        var transporter = nodemailer.createTransport({
    		service: 'Gmail',
    		auth: {
    			user: credentialGmail.user,
    			pass: credentialGmail.password
    		}
    	});

        var mailOptions = {
            from: 'Kindlized ✔ <kogai0121@gmail.com>',
            to: mail,
            subject: 'kindlizedアカウント認証',
            text: sendHtml,
            html: sendHtml
        };

        transporter.sendMail( mailOptions, function( error, info ){
            if(error){
                console.log(error);
            }else{
                console.log('Message sent: ' + info.response);
            }
            d.resolve( data );
        });
    }else{
        d.resolve( data );
    }
	return d.promise;
};

var renderRouter = function( data ){
	var res    = data.res;
	var d      = Q.defer();

    var statusMessage = '';
    if( data.isRegisterd ){
        statusMessage = 'アカウントの登録に成功しました。\n登録したメールアドレスに確認メールを送信しています。'
    }else{
        statusMessage = 'アカウントの登録に失敗しました。';
    }
	res.send( statusMessage );
	d.resolve( data );

	return d.promise;
}

module.exports = function( data ){
	makeNewUserModel( data )
    .then( makeMailTemplate )
    .then( sendVerifyMail )
    .then( renderRouter )
    .done( function( data ){
        console.log( '新規ユーザー登録完了' );
    });
};
