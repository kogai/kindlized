"use strict";

var validator = require('validator');
var nodemailer = require('nodemailer');
var mandrillTransport = require('nodemailer-mandrill-transport');

var credentialMandrill = require('common/makeCredential')('mandrill');

function Mailer(opts){
	// 必須項目のチェック
	if(!opts.subject){ throw new Error("Mailer must have subject."); }
	if(!opts.from){ throw new Error("Mailer must have from mail-address."); }
	if(!opts.to){ throw new Error("Mailer must have to mail-address."); }
	if(!opts.text && !opts.html){
		throw new Error("Mailer must pass text or html.");
	}

	// バリデーション
	if(!validator.isEmail(opts.from) || !validator.isEmail(opts.to)){
		throw new Error("to and from should exactly mail-address.");
	}

	this.subject = opts.subject;
	this.from = opts.from;
	this.to = opts.to;
	this.text = opts.text || "";
	this.html = opts.html || "";
}

Mailer.prototype.send = function(callback){
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
			callback(error);
    }
    callback(null, info);
  });
};

module.exports = function(opts){
	return new Mailer(opts);
};
