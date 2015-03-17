var Q = require('q');
var localPassport 		= require('routes/account/login/lib/localPassport');
var passPortSerialize 	= require('routes/account/login/lib/passPortSerialize');

localPassport.serializeUser = passPortSerialize.serialize;
localPassport.deserializeUser = passPortSerialize.deSerialize;

module.exports = {
	localPassport: localPassport
};
