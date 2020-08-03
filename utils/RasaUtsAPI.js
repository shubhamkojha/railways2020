const axios = require('axios');

module.exports = axios.create({
	baseURL: process.env.RASA_UTS_ENGINE,
});
