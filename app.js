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
const enquiryComponent = require('./api/enquiryComponent.js');
const indirectNearby = require('./api/indirectNearby.js');
const indirectNearByTrains = require('./api/indirectNearby.js');
const uts = require('./api/utsReservation.js');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/direct-trains/', directTrains);
app.use('/alternate-trains', singleBreakTrains);
app.use('/station-name-to-code', stationNameToCode);
app.use('/train-name', trainName);
app.use('/booking-proxy', bookingProxy);
app.use('/enquiry-proxy', enquiryProxy);
app.use('/get-enquiry-component', enquiryComponent);
app.use('/alternate-trains-from-nearby', indirectNearByTrains);
app.use('/get-uts', uts);

module.exports = app;
