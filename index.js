const express = require('express')
const app = express()
const port = 3000

fakeDatabase = {
	"a" : {name: "person1", age: "10"},
	"b" : {name: "person2", age: "15"},
	"c" : {name: "person3", age: "20"},
}

app.get('/database', (req, res) => {
	const users = Object.keys(fakeDatabase)
	const values = Object.values(fakeDatabase)
	res.send(values)
})

app.use(express.static('static_files'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))