const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongoose = require('mongoose');
const key="mongodb+srv://SIH2020:sih2020@cluster0.rsiad.mongodb.net/<dbname>?retryWrites=true&w=majority"
mongoose.connect(key,{
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.on('connected',()=>{
  console.log('connected to mongodb');
})
mongoose.connection.on('error',()=>{
  console.log('mongodb connection error');
})
const directTrains = require('./api/directTrains.js');
// const directTrainsNearbySt = require('./api/directTrainsNearbySt.js');
const singleBreakTrains = require('./api/singleBreakTrains.js');
// const singleBreakTrainsNearbySt = require('./api/singleBreakTrainsNearbySt.js');
// const stationDecoder = require('./api/stationDecoder.js');
// const trainNumbertoName = require('./api/trainNumbertoName.js');
const feedback=require('./api/feedback.js');
var cors = require('cors')
app.use(cors())
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
// app.use('/station-decoder', stationDecoder);
// app.use('/train-name', trainNumbertoName);
app.use('/feedback',feedback);
module.exports = app;
