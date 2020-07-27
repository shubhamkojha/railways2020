const express = require('express');
const bodyParser = require('body-parser');
const app = express();

require('dotenv').config();
var cors = require('cors');

const directTrains = require('./api/directTrains.js');
const singleBreakTrains = require('./api/singleBreakTrains.js');
const stationNameToCode = require('./api/stationNameToCode.js');
const trainName = require('./api/trainName.js');
const bookingProxy = require('./api/bookingProxy.js');
const enquiryProxy = require('./api/enquiryProxy.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/direct-trains/', directTrains);
app.use('/alternate-trains', singleBreakTrains);
app.use('/station-name-to-code', stationNameToCode);
app.use('/train-name', trainName);
app.use('/booking-proxy', bookingProxy);
app.use('/enquiry-proxy', enquiryProxy);

module.exports = app;
