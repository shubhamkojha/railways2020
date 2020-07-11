const trainsVisitingStation = require('../data/trainsVisitingStation.json');
const distance = require('../data/distance.json');
const trainNumberToName = require('../data/train_number_to_name.json');
const runningDays = require('../data/runningDays.json');

module.exports = function() {
	this.directTrainsBetweenTwoStations = (origin, destination) => {
		var originTrains = trainsVisitingStation[origin];
		var destinationTrains = trainsVisitingStation[destination];

		var directTrains = [];

		for (trainNumber in originTrains) {
			try {
				if (
					destinationTrains[trainNumber] !== undefined &&
					distance[trainNumber][origin].distance < distance[trainNumber][destination].distance
				) {
					var arrivalAtOrigin = trainsVisitingStation[origin][trainNumber].arrival;
					var departureAtOrigin = trainsVisitingStation[origin][trainNumber].departure;
					var arrivalAtDestination = trainsVisitingStation[destination][trainNumber].arrival;

					directTrains.push({
						number: trainNumber,
						name: trainNumberToName[trainNumber][0],
						origin: origin,
						destination: destination,
						originDeparture: departureAtOrigin,
						destinationArrival: arrivalAtDestination,
						duration: duration(
							distance[trainNumber][destination].duration,
							distance[trainNumber][origin].duration,
						),
						totalDistance:
							-distance[trainNumber][origin].distance + distance[trainNumber][destination].distance,
					});
				}
			} catch (error) {
				continue;
			}
		}

		return directTrains;
	};

	this.duration = function(connectionDuration, originDuration) {
		const splitConnectionDuration = connectionDuration.split(':');
		const splitOriginDuration = originDuration.split(':');

		const originMinutes = parseInt(splitOriginDuration[1], 10);
		const connectionMinutes = parseInt(splitConnectionDuration[1], 10);

		const minuteDifference = connectionMinutes - originMinutes;
		var hourCarry = 0;
		if (minuteDifference < 0) {
			hourCarry = 1;
		}
		const actualMinutes = (minuteDifference % 60 + 60) % 60;

		const originHour = parseInt(splitOriginDuration[0], 10);
		const connectionHour = parseInt(splitConnectionDuration[0], 10);

		const actualHour = connectionHour - originHour - hourCarry;

		return actualHour.toString() + ':' + actualMinutes.toString() + ':' + '00';
	};
};
