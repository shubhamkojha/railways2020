const express = require('express');
const router = express.Router();

const trainNumbertoName = require('../data/train_number_to_name.json');

router.post('/', (req, res, next) => {
	const number = req.body.number;

	try {
		res.status(200).json(trainNumbertoName[number][0]);
	} catch (error) {
		res.status(404).json('Not found');
	}
	next();
});

module.exports = router;
