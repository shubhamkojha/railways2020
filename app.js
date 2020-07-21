const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');

const directTrains = require('./api/directTrains.js');
const singleBreakTrains = require('./api/singleBreakTrains.js');
const stationNameToCode = require('./api/stationNameToCode.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/direct-trains/', directTrains);
app.use('/alternate-trains', singleBreakTrains);
app.use('/station-name-to-code', stationNameToCode);

module.exports = app;
