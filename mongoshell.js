/*
	DBとユーザーの作成
*/

conn = new Mongo();
printjson(db.adminCommand('listDatabases').databases);
db = db.getSiblingDB('kindlized');

db.createUser({
	user: "kindlized",
	pwd: "r5FLahwlAcgAwrzlDVSy",
	roles: [
		{
			role: "userAdmin",
			db: "cheers"
		}
	]
})

db.sequences.insert({
	seq: 0
});

printjson(db.adminCommand('listDatabases').databases);
