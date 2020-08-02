const express = require('express');
const router = express.Router();
const stationNameToCode = require('../data/stationNametoCode.json');

router.post('/', (req, res, next) => {
	const additions = [ 'Central', 'Junction', 'Terminal', 'City', 'Cantt.' ];
	const capitalizeFirstLetter = (name) => {
		return name.charAt(0).toUpperCase() + name.slice(1);
	};
	try {
		for (key in additions) {
			var name = req.body.name;
			name = capitalizeFirstLetter(name);

			name = name + ' ' + additions[key];
			const stationName = stationNameToCode[name];
			if (stationName !== undefined) {
				res.status(200).json(stationName);
				break;
			}
		}
	} catch (error) {
		console.log(error);
	}
	res.status(200).json('No Station Found');
});

module.exports = router;
