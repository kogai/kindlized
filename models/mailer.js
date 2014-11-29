var nodemailer = require('nodemailer');
var credential = require('../credential');

var sendverification = function ( data ){

	var transporter = nodemailer.createTransport({
		service: 'Gmail',
		auth: {
			user: credential.gmail.user,
			pass: credential.gmail.pwd
		}
	});

	var mailOptions = {
		from: 'Fred Foo ✔ <kogai0121@gmail.com>', 
		to: data.mail, 
		subject: 'Verify mail adress',
		text: 'Click link below <br>' + data.link,
		html: 'Click link below <br>' + data.link
	};

	transporter.sendMail(mailOptions, function(error, info){
		if(error){
			console.log(error);
		}else{
			console.log('Message sent: ' + info.response);
		}
	});
};

module.exports = sendverification;