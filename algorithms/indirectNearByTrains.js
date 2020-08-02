const nearbyStationsData = require('../data/NearbyStations.json');
require('./singleBreakTrainsBetweenTwoStations.js')();

module.exports = function() {
	this.trainsfromNearbyStations = function(origin, destination, date, state) {
		var results = [];

		const nearbyStationsToOrigin = nearbyStationsData[origin];
		const nearbyStationsToDestination = nearbyStationsData[destination];

		try {
			if (state === 'origin' || state === 'both') {
				for (key in nearbyStationsToOrigin) {
					const findAlternateTrainsWithNearbyOrigin = singleBreakTrainsBetweenTwoStations(
						nearbyStationsToOrigin[key],
						destination,
						date,
					);
					results.push(findAlternateTrainsWithNearbyOrigin);
				}
			}

			if (state === 'destination' || state === 'both') {
				for (key in nearbyStationsToDestination) {
					const findAlternateTrainsWithNearbyDestination = singleBreakTrainsBetweenTwoStations(
						nearbyStationsToOrigin[key],
						destination,
						date,
					);
					results.push(findAlternateTrainsWithNearbyDestination);
				}
			}

			return results;
		} catch (error) {
			throw error;
		}
	};
};
