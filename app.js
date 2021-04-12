const express = require('express');
const app = express();

//example of middleware
app.use(function (req, res, next) {
	console.log(Date.now());
	next();
});

app.get('/', (req, res) => {
	res.send('Hello world');
});

app.get('/about', (req, res) => {
	res.send('About');
});

const PORT = 5000;

app.listen(PORT, () => {
	console.log(`Server started on port ${PORT}`);
});
