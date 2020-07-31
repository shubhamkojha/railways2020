const express = require('express');
const axios = require('axios');

const router = express.Router();

router.post('/', async (req, res, next) => {
	const trainNumber = req.body.trainNumber;

	try {
		if (trainNumber !== undefined) {
			const enquiryComponent = await axios.get(
				`https://erail.in/train-running-status/${trainNumber}?date=29-Jul-2020&from=STW`,
			);

			res.status.json(enquiryComponent);
		}
	} catch (error) {
		res.status(500).json(error);
	}
});

module.exports = router;
