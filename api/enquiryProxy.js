const express = require('express');
const router = express.Router();
const { TranslationServiceClient } = require('@google-cloud/translate');
const translationClient = new TranslationServiceClient();
const RasaEnquiryAPI = require('../utils/RasaEnquiryAPI.js');

const projectId = process.env.PROJECT_ID;
const location = process.env.LOCATION;

router.post('/', async (req, res, next) => {
	const text = req.body.text;
	const language = req.body.language;

	if (language === 'en') {
		try {
			const RasaRequest = { text: text };
			const entityCall = await RasaEnquiryAPI.post('/', RasaRequest);
			const entityExtractionEntities = entityCall.data.entities;
			const entityExtractionIntent = entityCall.data.intent;
			res.status(200).json({ entity: entityExtractionEntities, intent: entityExtractionIntent });
		} catch (error) {
			res.status(500).json(error);
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
			const entityCall = await RasaEnquiryAPI.post('/', RasaRequest);

			const entityExtraction = entityCall.data.entities;
			const intentExtraction = entityCall.data.intent;
			res.status(200).json({ entity: entityExtraction, intent: intentExtraction });
		}
	} catch (error) {
		throw error;
		next();
	}
	next();
});
module.exports = router;
