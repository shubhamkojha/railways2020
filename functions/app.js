const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const directTrains = require('./api/directTrains.js');
const singleBreakTrains = require('./api/singleBreakTrains.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', '*');
	res.header('Aceess-Control-Allow-Header', '*');

	if (req.method === 'OPTIONS') {
		res.header('Access-Control-Allow-Methods', 'POST GET PATCH PUT DELETE');
		return res.status(200).json({});
	}

	next();
});

app.use('/direct-trains/', directTrains);
app.use('/alternate-trains', singleBreakTrains);

module.exports = app;
