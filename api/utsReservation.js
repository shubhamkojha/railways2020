const express = require('express');
const router = express.Router();
const { TranslationServiceClient } = require('@google-cloud/translate');
const translationClient = new TranslationServiceClient();

const RasaUtsAPI = require('../utils/RasaUtsAPI.js');
const stationNameToCode = require('../data/stationNametoCode.json');
require('../algorithms/stationNameToCodeResolver.js')();

const projectId = process.env.PROJECT_ID;
const location = process.env.LOCATION;

require('../algorithms/utsTrainFinder.js')();
require('../algorithms/stationCodeValidator.js')();
require('../algorithms/stationNameToCodeResolver.js')();

router.post('/', async (req, res, next) => {
	const text = req.body.text;
	const language = req.body.language || 'en';
	const date = req.body.date;
	const day = new Date(date).getDay();

	if (language === 'en') {
		try {
			const RasaRequest = { text: text };
			const entityCall = await RasaUtsAPI.post('/', RasaRequest);
			const entityExtractionEntities = entityCall.data.entities;
			const entityExtractionIntent = entityCall.data.intent;

			var extract = {};

			for (key in entityExtractionEntities) {
				extract[entityExtractionEntities[key].entity] = entityExtractionEntities[key].value;
			}
			if (extract['ticketsNumber'] > 4) {
				res.status(404).json('Cannot book more than 4 tickets');
			}
			if (extract['viaStation'] === undefined) {
				res.status(404).json('Please specify a route by stating a via station');
			}
			var originCode = stationNameToCodeResolver(extract['orig']);
			var destinationCode = stationNameToCodeResolver(extract['dest']);
			var viaCode = stationNameToCodeResolver(extract['viaStation']);
			var number = extract['ticketsNumber'];
			try {
				if (stationCodeValidator(originCode, destinationCode)) {
					res.status(200).json(utsTrainFinder(originCode, destinationCode, viaCode, number, day, date));
				}
			} catch (error) {
				res.status(404).json(error);
			}
			next();
		} catch (error) {
			throw error;
		}
		next();
	}
	try {
		const request = {
			parent: `projects/${projectId}/locations/${location}`,
			contents: [ text ],
			mimeType: 'text/plain',
			sourceLanguageCode: language,
			targetLanguageCode: 'en',
		};
		const [ response ] = await translationClient.translateText(request);
		for (const translation of response.translations) {
			const translationToEnglish = translation.translatedText;

			const RasaRequest = { text: translationToEnglish };
			const entityCall = await RasaUtsAPI.post('/', RasaRequest);

			const entityExtraction = entityCall.data.entities;
			const intentExtraction = entityCall.data.intent;

			var extract = {};

			for (key in entityExtraction) {
				extract[entityExtraction[key].entity] = entityExtraction[key].value;
			}
			if (extract['ticketsNumber'] > 4) {
				res.status(404).json('Cannot book more than 4 tickets');
			}
			if (extract['viaStation'] === undefined) {
				res.status(404).json('Please specify a route by stating a via station');
			}
			var originCode = stationNameToCodeResolver(extract['orig']);
			var destinationCode = stationNameToCodeResolver(extract['dest']);
			var viaCode = stationNameToCodeResolver(extract['viaStation']);
			try {
				if (stationCodeValidator(originCode, destinationCode)) {
					res.status(200).json(utsTrainFinder(originCode, destinationCode, viaCode, day, date));
				}
			} catch (error) {
				res.status(404).json(error);
			}
			next();
		}
	} catch (error) {
		res.status(500).json('Something went wrong');
	}
});

module.exports = router;
