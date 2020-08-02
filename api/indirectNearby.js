const express = require('express');
const indirectNearByTrains = require('../algorithms/indirectNearByTrains.js');
const router = express.Router();

require('../algorithms/indirectNearByTrains.js')();
require('../algorithms/stationCodeValidator.js')();

router.post('/', (req, res, next) => {
	var origin = req.body.origin;
	var destination = req.body.destination;
	var date = req.body.date;
	var state = req.body.state;

	try {
		if (stationCodeValidator(origin, destination)) {
			origin = origin.toUpperCase();
			destination = destination.toUpperCase();
			res.status(200).json(trainsfromNearbyStations(origin, destination, date, state));
		} else {
			res.status(404).json('Invalid Station Details');
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
