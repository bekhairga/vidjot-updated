const express = require('express');
const app = express();

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
