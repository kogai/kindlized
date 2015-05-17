"use strict";

var Author = require('models/Author');

var LIMIT = process.argv[2];
var executedCount = 0;
var updateRecursive = function(authors){
	if(executedCount === LIMIT){
		Author.find({ pageId: {
				$exists: true
			}
		}, function(err, authors){
			if(err){
				return console.log("err", err);
			}
			console.log("modeified authors is", authors.length);
		});
		return;
	}

	var author = authors[executedCount];
	Author.findOneAndUpdate({ _id: author._id }, { pageId: executedCount + 1 }, function(err, author){
		if(err){
			return console.log("err", err);
		}
		console.log("%d : %s", author.pageId, author.name);
		executedCount += 1;
		updateRecursive(authors);
	});
};

(function() {
	var query = Author.find({}).limit(LIMIT);

	query.exec(function(err, authors){
		if(err){
			return console.log("err", err);
		}
		updateRecursive(authors);
	});

}());
