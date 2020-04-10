const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();

const directTrains = require("./api/directTrains.js");
const singleBreakTrains = require("./api/singleBreakTrains.js");
const stationDecoder = require("./api/stationDecoder.js");
const trainNumbertoName = require("./api/trainNumbertoName.js");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(cors());



app.use('/direct-trains', directTrains);
app.use('/single-break-trains',singleBreakTrains);
app.use('/station-decoder', stationDecoder);
app.use('/train-name', trainNumbertoName);

module.exports = app;