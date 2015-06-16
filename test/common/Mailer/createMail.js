"use strict";

var log = require('common/log');
var Mailer = require('common/Mailer')({
  from: "info@kindlize.it",
  to: "info@kindlize.it",
  subject: "[kindlize.it] 登録していた書籍がKindle化されました",
  text: "user.sendHtml",
  html: "user.sendHtml"
});

var mock = require('./mock_createMail');

Mailer.createMail("series", mock, function(err, mailStrings){
	if(err){
		return log.info(err);
	}
	log.info(mailStrings);
});
