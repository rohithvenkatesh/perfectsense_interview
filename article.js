const express = require('express')
const app = express()
const port = 3000

app.set('view engine', 'pug')
app.set('views', process.cwd() + '/views'); 

fakeDatabase = {
	"a" : {name: "person1", age: "10"},
	"b" : {name: "person2", age: "15"},
	"c" : {name: "person3", age: "20"},
}

app.get('/database', (req, res) => {
	const users = Object.keys(fakeDatabase)
	const values = Object.values(fakeDatabase)
	res.send(users)
})

app.get('/', (req, res) => {
	const users = Object.keys(fakeDatabase)
	const values = Object.values(fakeDatabase)
	res.render('index.pug')
})

app.post('/', function (req, res) {
	// res.render('index.pug')
});

// app.get('/index.css', (req, res) => {
// 	const users = Object.keys(fakeDatabase)
// 	const values = Object.values(fakeDatabase)
// 	res.sendFile('index.css', {root: __dirname})
// 	// res.render('index.pug')
// })

// const htmlDirectory = express.static(__dirname + '/views')
// app.use(htmlDirectory);

const cssDirectory = express.static(__dirname + '/css')
const scriptsDirectory = express.static(__dirname + '/scripts')
app.use(cssDirectory);
app.use(scriptsDirectory);


app.listen(port, () => console.log(`Example app listening on port ${port}!`))