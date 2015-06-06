"use strict";

var request = require('superagent');
var log = require('common/log');
var slackPostAPI = require('common/makeCredential')('slack');
var tmp = require('./tmp');

module.exports = function(req, res){
	var mandrillEvents = req.body.mandrill_events;
	var mandrillBody, mandrillHtml;

	try{
		mandrillBody = JSON.parse(mandrillEvents);
	}catch(err){
		log.info(err);
	}finally{
		mandrillHtml = mandrillBody[0].msg.html;
	}

	request
	.post(slackPostAPI)
	.send({
		text: mandrillHtml
	})
	.end(function(err, res){
		log.info(res.text);
	});

	res.send('ok');
};
