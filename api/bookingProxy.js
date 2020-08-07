const express = require('express');
const router = express.Router();
const { TranslationServiceClient } = require('@google-cloud/translate');
const translationClient = new TranslationServiceClient();
const RasaAPI = require('../utils/RasaAPI.js');

const projectId = process.env.PROJECT_ID;
const location = process.env.LOCATION;

router.post('/', async (req, res, next) => {
	const text = req.body.text;
	const language = req.body.language || 'en';

	const request = {
		parent: `projects/${projectId}/locations/${location}`,
		contents: [ text ],
		mimeType: 'text/plain',
		sourceLanguageCode: language,
		targetLanguageCode: 'en',
	};

	if (language === 'en') {
		try {
			const RasaRequest = { text: text };
			const entityCall = await RasaAPI.post('/', RasaRequest);
			const entityExtraction = entityCall.data.entities;
			res.status(200).json(entityExtraction);
		} catch (error) {
			res.status(500).json(error);
		}
	}
	try {
		const [ response ] = await translationClient.translateText(request);
		for (const translation of response.translations) {
			const translationToEnglish = translation.translatedText;

			const RasaRequest = { text: translationToEnglish };
			const entityCall = await RasaAPI.post('/', RasaRequest);
			const entityExtraction = entityCall.data.entities;
			res.status(200).json(entityExtraction);
		}
	} catch (error) {
		res.status(500).json(error);
	}
});
module.exports = router;
