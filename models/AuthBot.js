"use strict";

var MakeModel = require('common/makeModel');

var AuthBotSchema = {
	screen_name: String,
	user: Object,
	accessToken: String,
	accessTokenSecret: String
};

module.exports = new MakeModel('AuthBot', AuthBotSchema);
