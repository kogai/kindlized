// メールを送信

var Q = require('q');
var nodemailer = require('nodemailer');
var credential = require('credential');

module.exports = function( user ){
   var d = Q.defer();
   var sendHtml      = user.sendHtml;
   var kindlizedList = user.kindlizedList;

   if( kindlizedList.length > 0 ){
   	var transporter = nodemailer.createTransport({
   		service: 'Gmail',
   		auth: {
   			user: credential.gmail.user,
   			pass: credential.gmail.password
   		}
   	});

   	var mailOptions = {
   		from: 'Kindlized ✔ <kogai0121@gmail.com>',
   		to: user.mail,
   		subject: 'Kindle化通知',
   		text: sendHtml,
   		html: sendHtml
   	};

   	transporter.sendMail( mailOptions, function( error, info ){
   		if(error){
   			console.log(error);
   		}else{
   			console.log('Message sent: ' + info.response);
   		}
         d.resolve( user );
   	});
   }else{
      d.resolve( user );
   }

   return d.promise;
}
