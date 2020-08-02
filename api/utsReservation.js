const express = require('express');
const router = express.Router();

require('../algorithms/utsTrainFinder.js')();
require('../algorithms/stationCodeValidator.js')();

router.post('/', (req, res, next) => {
	var origin = req.body.origin.toUpperCase();
	var destination = req.body.destination.toUpperCase();
	var via = req.body.via.toUpperCase();
	var date = req.body.date;
	var getDate = new Date(date);
	var day = getDate.getDay();

	try {
		if (stationCodeValidator(origin, destination)) {
			res.status(200).json(utsTrainFinder(origin, destination, via, day, date));
		}
	} catch (error) {
		res.status(404).json(error);
	}
	next();
});

module.exports = router;
