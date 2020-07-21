const express = require('express');
const router = express.Router();
const stationNameToCode = require('../data/stationNametoCode.json');

router.post('/', (req, res, next) => {
	const additions = [ '', 'Central', 'Junction', 'Terminal', 'City' ];
	capitalizeFirstLetter = (name) => {
		return name.charAt(0).toUpperCase() + name.slice(1);
	};
	for (key in additions) {
		var name = req.body.name;
		name = capitalizeFirstLetter(name);
		name = name + ' ' + additions[key];
		console.log(name);
		try {
			if (stationNameToCode[name] !== undefined) {
				res.status(200).json(stationNameToCode[name]);
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
