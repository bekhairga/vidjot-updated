const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
//connecting to mongoose
mongoose
	.connect('mongodb://localhost/vidjot-dev', {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log('Connected to database');
	})
	.catch((error) => {
		console.log('Error' + error);
	});
//Loading Idea model
require('./models/Idea');
const Idea = mongoose.model('ideas');
//using handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
//express new way of using body parser
app.use(express.json());
app.use(
	express.urlencoded({
		extended: true,
	})
);
//routes
app.get('/', (req, res) => {
	const title = 'Welcome';
	res.render('index', {
		title: title,
	});
});

app.get('/about', (req, res) => {
	res.render('about');
});
//crud
//add idea form
//views can be separated in the folder and to access the folders the following below code shows
app.get('/ideas/add', (req, res) => {
	res.render('ideas/add');
});
//idea index page
app.get('/ideas', (req, res) => {
	Idea.find({})
		.sort({ date: 'desc' })
		.lean()
		.then((ideas) => {
			res.render('ideas/index', { ideas: ideas });
		});
});
//processing form
app.post('/ideas', (req, res) => {
	let errors = [];
	if (!req.body.title) {
		errors.push({ text: 'Please add title' });
	}
	if (!req.body.details) {
		errors.push({ text: 'Please add details' });
	}
	if (errors.length === 0) {
		const newUser = {
			title: req.body.title,
			details: req.body.details,
		};
		new Idea(newUser).save().then((idea) => {
			res.redirect('ideas/');
		});
	} else {
		res.render('ideas/add', {
			errors: errors,
			title: req.body.title,
			details: req.body.details,
		});
	}
});

const PORT = 5000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
