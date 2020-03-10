const express = require('express')
const app = express()
const port = 3000

// database
const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('comments.db')
db.serialize(() => {
	db.run('DROP TABLE IF EXISTS comments ')
	db.run('CREATE TABLE comments (pk INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, comment TEXT)')
	db.run("INSERT INTO comments(name, comment) VALUES('personA', 'this is a person A comment')")
})

// home
app.get('/', (req, res) => {
	res.render('index.pug')
})

// get comments from database
app.get('/comments', (req, res) => {
	db.all(
		'SELECT * FROM comments', 
		(err, rows) => res.send(rows)
	)
})

// add comments to database
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); 
app.post('/comments', function (req, res) {
	db.run(
		'INSERT INTO comments(name, comment) VALUES ($name, $comment)', 
		{$name: req.body.name, $comment: req.body.comment},
		(err)=>{
			if (err) res.send({message: "error in new comment"})
			else {
				db.all(
					'SELECT pk FROM comments ORDER BY pk DESC LIMIT 1',
					(err, rows) => res.send({message: "successful comment insertion", pk: rows[0].pk})
				)
			}
		}
	)
});

// css + scripts
const cssDirectory = express.static(__dirname + '/css')
const scriptsDirectory = express.static(__dirname + '/scripts')
app.use(cssDirectory);
app.use(scriptsDirectory);

// port
app.listen(port)
