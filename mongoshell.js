/*
	DBとユーザーの作成
*/

conn = new Mongo();
printjson(db.adminCommand('listDatabases').databases);
db = db.getSiblingDB('kindlized');

db.createUser({
	user: "root",
	pwd: "root",
	roles: [
		{
			role: "userAdmin",
			db: "cheers"
		}
	]
})

printjson(db.adminCommand('listDatabases').databases);
