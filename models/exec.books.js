var Books = require('../models/db.books.js');
var credential = require('../credential');
var crypto = require('crypto');
var app = require('express')()

function getISO8601Timestamp(){
	var d = new Date();

	var ye = d.getUTCFullYear();
	var mo = zeroPlus(d.getUTCMonth() + 1);
	var da = zeroPlus(d.getUTCDate());
	var ho = zeroPlus(d.getUTCHours());
	var mi = zeroPlus(d.getUTCMinutes());
	var se = zeroPlus(d.getUTCSeconds());

	return ye + "-" + mo + "-" + da + "T" + ho + ":" + mi + ":" + se + "Z";
}

function zeroPlus(value){
  return ("0" + value).slice(-2);
}

module.exports = function (){
	var ciphers = crypto.getHashes();
	
	var timeStamp = getISO8601Timestamp();
	var getAwsProducts = 'http://webservices.amazon.com/onca/xml?';
	var productsReqArray = [];
	var para = {
	  "Service":"AWSECommerceService",
	  "AWSAccessKeyId" : credential.amazon.AWSAccessKeyId,
	  "Operation":"ItemLookup",
	  "ItemId":"0679722769",
	  "ResponseGroup":"ItemAttributes,Offers,Images,Reviews",
	  "Version":"2009-07-01",
	  "Timestamp": timeStamp
	};

	for(var pname in para){
		productsReqArray.push(pname + "=" + encodeURIComponent(para[pname]));
	}
	productsReqArray.sort();
	var str_para = productsReqArray.join('&');
	var str_signature = "GET" + "¥n" + "webservices.amazon.com" + "¥n" + "/onca/xml" + "¥n" + str_para;

	var hashObj = crypto.createHmac( 'sha256' , credential.amazon.AWSSecretAccessKey ).update(str_signature)/*.digest('base64')*/;
	console.log(hashObj);
	var para_signature = "&Signature=" + encodeURIComponent(hashObj);

	var result = "http://webservices.amazon.com/onca/xml?" + str_para + para_signature;
	return result;
}