"use strict";

var credential, AWSAccessKeyId, AWSSecretAccessKey, AWSassociatesId;

if (process.env.AWSAccessKeyId || process.env.CI) {
	//heroku or CircleCI用変数
	AWSAccessKeyId = process.env.AWSAccessKeyId;
	AWSSecretAccessKey = process.env.AWSSecretAccessKey;
	AWSassociatesId = process.env.AWSassociatesId;
} else {
	//サービスサーバー用変数
	credential = require('credential.js');
	AWSAccessKeyId = credential.amazon.AWSAccessKeyId;
	AWSSecretAccessKey = credential.amazon.AWSSecretAccessKey;
	AWSassociatesId = credential.amazon.AWSassociatesId;
}

module.exports = function() {
	return {
		endPoint: 'ecs.amazonaws.jp',
		awsId: AWSAccessKeyId,
		awsSecret: AWSSecretAccessKey,
		assocId: AWSassociatesId
	};
};
