const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('comments.db')

db.serialize(() => {
	db.run("CREATE TABLE comments (name TEXT, comment TEXT)")

	db.run("INSERT INTO comments VALUES('personA', 'this is a person A comment')")
	db.run("INSERT INTO comments VALUES('personB', 'this is a person B comment')")
	db.run("INSERT INTO comments VALUES('personC', 'this is a person C comment')")
	db.run("INSERT INTO comments VALUES('personD', 'this is a person D comment')")
	db.run("INSERT INTO comments VALUES('personE', 'this is a person E comment')")
})

db.close()