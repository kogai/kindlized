"use strict";

var AuthServer = require('Bots/AuthServer');
var Bots = {};
Bots.TwitterBot = require('Bots/TwitterBot');
Bots.AuthServer = AuthServer();

Bots.AuthServer.listen(function(){
	console.log("Authentication server start.");
});
