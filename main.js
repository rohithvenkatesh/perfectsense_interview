const express = require('express')
const app = express()
const port = 3000

const sqlite3 = require('sqlite3')
const db = new sqlite3.Database('comments.db')

// home
app.get('/', (req, res) => {
	res.render('index.pug')
})

// get comments from database
app.get('/comments', (req, res) => {
	db.all(
		'SELECT * FROM comments', 
		(err, rows) => res.send(rows))
})

// add comments to database
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true})); 
app.post('/comments', function (req, res) {
	db.run(
		'INSERT INTO comments VALUES ($name, $comment)', 
		{$name: req.body.name, $comment: req.body.comment},
		(err)=>{
			if (err) res.send({message: "error in new comment"})
			else res.send({message: "successful comment insertion"})
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