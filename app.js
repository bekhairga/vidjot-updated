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

app.get('/', (req, res) => {
	const title = 'Welcome';
	res.render('index', {
		title: title,
	});
});

app.get('/about', (req, res) => {
	res.render('about');
});

const PORT = 5000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
