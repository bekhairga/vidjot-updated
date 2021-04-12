const express = require('express');
const app = express();
const exphbs = require('express-handlebars');

//using handlebars middleware
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
	const title = 'welcome';
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
