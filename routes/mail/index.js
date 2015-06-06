"use strict";

var request = require('superagent');
var log = require('common/log');
var slackPostAPI = require('common/makeCredential')('slack');

module.exports = function(req, res){
	var mandrillEvents = req.body.mandrill_events;
	var mandrillBody, mandrillHtml;

	try{
		mandrillBody = JSON.parse(mandrillEvents);
	}catch(err){
		log.info(err);
		return res.send('no');
	}finally{
		mandrillHtml = mandrillBody[0].msg.html;
	}

	request
	.post(slackPostAPI)
	.send({
		text: mandrillHtml
	})
	.end(function(err, ret){
		res.send(ret.text);
	});

};
