const express = require('express');
const router = express.Router();
const stationNameToCode = require('../data/stationNametoCode.json');

router.post('/', (req, res, next) => {
	const additions = [ '', 'Central', 'Junction', 'Terminal', 'City' ];

	for (key in additions) {
		var name = req.body.name;
		name = name + ' ' + additions[key];
		console.log(name);
		try {
			if (stationNameToCode[name] !== undefined) {
				res.status(200).send(stationNameToCode[name]);
			} else {
				continue;
			}
		} catch (error) {
			console.log(error);
		}
	}

	res.status(200).send('No Station Found');
	next();
});

module.exports = router;
