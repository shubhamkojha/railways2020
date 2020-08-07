const express = require('express');
const router = express.Router();
const stationNameToCode = require('../data/stationNametoCode.json');
require('../algorithms/stationNameToCodeResolver')();
require('../algorithms/stationNameToCodeResolver.js')();

router.post('/', (req, res, next) => {
	try {
		var name = req.body.name;
		res.status(200).json(stationNameToCodeResolver(name));
	} catch (error) {
		console.log(error);
	}
	res.status(200).json('No Station Found');
});

module.exports = router;
