const express = require('express')
const app = express()
const port = process.env.PORT || 3000

// body parser
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));


// mongoose
const mongoose = require('mongoose');

const UserComment = mongoose.model("UserComment", new mongoose.Schema({
	name: { type: String, required: true, }, comment: { type: String, required: true, }, datetime: { type: String, required: true, },
	likes: { type: Number, }, likeStatus: { type: Number, },
}))

//connect to mongodb atlas with mongoose
mongoose.connect(process.env.MONGODB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true
}).then(() => {
	console.log('MongoDB Connected…')
}).catch(err => console.log(err))

// home
app.get('/', (req, res) => {
	res.render('index.pug')
})

// post a comment
app.post('/comments', async (req, res) => {
	const comment = new UserComment({ name: req.body.name, comment: req.body.comment, datetime: req.body.datetime })
	await comment.save()
	res.send(comment)
});

// get all comments
app.get('/comments', function (req, res) {
	UserComment.find({}, function (err, comments) {
		var commentsMap = {};
		comments.forEach(function (comment) {
			commentsMap[comment._id] = comment;
		});
		res.send(commentsMap);
	});
})

// css + scripts
const cssDirectory = express.static(__dirname + '/css')
const scriptsDirectory = express.static(__dirname + '/scripts')
app.use('/css', cssDirectory);
app.use('/scripts', scriptsDirectory);

// port
app.listen(port)
