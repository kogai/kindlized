"use strict";

var validator = require('validator');
var nodemailer = require('nodemailer');
var mandrillTransport = require('nodemailer-mandrill-transport');
var emailTemplates = require('email-templates');
var templatesDir = require('path').resolve(__dirname, '..',  "email-templates");

var credentialMandrill = require('common/makeCredential')('mandrill');
var log = require('common/log');

function Mailer(opts){
	// 必須項目のチェック
	// if(!opts.subject){ throw new Error("Mailer must have subject."); }
	// if(!opts.from){ throw new Error("Mailer must have from mail-address."); }
	// if(!opts.to){ throw new Error("Mailer must have to mail-address."); }
	// if(!opts.text && !opts.html){
	// 	throw new Error("Mailer must pass text or html.");
	// }

	// バリデーション
	// if(!validator.isEmail(opts.from) || !validator.isEmail(opts.to)){
	// 	throw new Error("to and from should exactly mail-address.");
	// }

	this.UserCollections = require('models/User');
	this.BookListCollections = require('models/BookList');

	this.subject = opts.subject;
	this.from = opts.from;
	this.to = opts.to;
	this.text = opts.text || "";
	this.html = opts.html || "";
}

Mailer.prototype.send = function(done){
  var transporter = nodemailer.createTransport(mandrillTransport({
    auth: {
      apiKey: credentialMandrill
    }
  }));

  var mailOptions = {
    from: "kindelize.it <" + this.from + ">",
    to: this.to,
    subject: this.subject,
    text: this.text,
    html: this.html
  };

  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
			return done(error);
    }
    done(null, info);
  });
};


/**
@param { String } from - from@kindlize.it
@param { String } to - to@user.it
@param { Object } templates - メールの文面
@example {
	html: '<a href="/">url</a>',
	text: 'url'
}
**/
Mailer.prototype.setMail = function(from, to, subject, templates){
	this.from = from;
	this.to = to;
	this.subject = subject;
	this.html = templates.html;
	this.text = templates.text;
};


/**
@param { String } type - テンプレートのタイプ
@param { Array } books - BookListコレクション
**/
Mailer.prototype.createTemplate = function(type, books, done){
	emailTemplates(templatesDir, function(err, template){
		if(err){
			return done(err);
		}

		var templateArgv = {
			books: books.map(function(book){
				var img;
		    try {
		      img = JSON.parse(book.images);
		      img = img[0].ImageSet[0].MediumImage[0].URL[0];
		    } catch (e) {
		      img = '';
		    }

				return {
					title: book.title,
					url: book.url,
					img: img
				};
			})
		};

		template(type, templateArgv, function(err, html, text){
			if(err){
				return done(err);
			}
			done(null, {
				html: html,
				text: text
			});
		});
	});
};

module.exports = function(opts){
	var _opts = opts || {};
	return new Mailer(_opts);
};
