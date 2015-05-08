var Q = require('q');
var modelUser = require('user');

var verifyAndModifyUser = function (data) {
	"use strict";
	var d = Q.defer();
	var req = data.req;
	var verifyId = req.query.id;

	modelUser.findOneAndUpdate({
		verifyId: verifyId
	}, {
		isVerified: true
	}, function(err, user) {
		if (err) {
			console.log(err);
		}
		data.user = user;
		d.resolve(data);
	});
	return d.promise;
};

var renderRouter = function (data) {
	"use strict";
	var res = data.res;
	var d = Q.defer();

	res.redirect(303, '/');
	d.resolve(data);

	return d.promise;
}

module.exports = function (data) {
	"use strict";
	verifyAndModifyUser(data)
		.then(renderRouter)
		.done(function(data) {
			console.log('新規ユーザー認証完了');
		});
};
