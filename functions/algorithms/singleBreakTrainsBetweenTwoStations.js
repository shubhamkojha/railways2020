const alternateRoutes = require('../data/alternateRoutes.json');
const trainsVisitingStation = require('../data/trainsVisitingStation.json');
const distanceData = require('../data/distance.json');
const distance = require('../data/distance.json');
const trainNumberToName = require('../data/train_number_to_name.json');
const { connection } = require('mongoose');

require('./directTrainsBetweenTwoStations.js')();

module.exports = function() {
	this.singleBreakTrainsBetweenTwoStations = function(origin, destination) {
		const result = [];
		var minDistance = 100000;

		for (var connection in alternateRoutes) {
			var trainBetweenConnectionOrigin = directTrainsBetweenTwoStations(origin, connection);

			if (trainBetweenConnectionOrigin.length > 0) {
				var trainBetweenConnectionDestination = directTrainsBetweenTwoStations(connection, destination);

				if (trainBetweenConnectionOrigin.length !== 0 && trainBetweenConnectionDestination.length !== 0) {
					const totalDistance =
						trainBetweenConnectionOrigin[0].totalDistance +
						trainBetweenConnectionDestination[0].totalDistance;

					if (minDistance > totalDistance) {
						minDistance = totalDistance;
					}
					result.push({
						connection: connection,
						distance: totalDistance,
						'origin-connection': trainBetweenConnectionOrigin,
						'connection-destination': trainBetweenConnectionDestination,
					});
				}
			}
		}
		return filterByDistance(result, minDistance);
	};

	this.filterByDistance = function(results, minDistance) {
		const result = [];
		for (key in results) {
			if (minDistance < 1000 && results[key].distance <= 1.1 * minDistance) {
				result.push(results[key]);
			}
			if (minDistance > 1000 && results[key].distance <= 1.03 * minDistance) {
				result.push(results[key]);
			}
		}
		return result;
	};
};
