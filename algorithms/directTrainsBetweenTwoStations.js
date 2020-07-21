const trainsVisitingStation = require('../data/trainsVisitingStation.json');
const distance = require('../data/distance.json');
const trainNumberToName = require('../data/train_number_to_name.json');
const runningDays = require('../data/runningDays.json');

module.exports = function() {
	this.directTrainsBetweenTwoStations = (origin, destination, day, date) => {
		var originTrains = trainsVisitingStation[origin];
		var destinationTrains = trainsVisitingStation[destination];

		var directTrains = [];

		for (trainNumber in originTrains) {
			try {
				if (
					destinationTrains[trainNumber] !== undefined &&
					distance[trainNumber][origin].distance < distance[trainNumber][destination].distance &&
					runningDays[origin][trainNumber][day] === true
				) {
					var arrivalAtOrigin = trainsVisitingStation[origin][trainNumber].arrival;
					var departureAtOrigin = trainsVisitingStation[origin][trainNumber].departure;
					var arrivalAtDestination = trainsVisitingStation[destination][trainNumber].arrival;

					const { duration, shiftInDay } = reachingDate(
						date,
						arrivalAtOrigin,
						distance[trainNumber][destination].duration,
						distance[trainNumber][origin].duration,
					);
					directTrains.push({
						number: trainNumber,
						name: trainNumberToName[trainNumber][0],
						origin: origin,
						boardingDate: date,
						destination: destination,
						reachingDate: shiftInDay,
						originDeparture: departureAtOrigin,
						destinationArrival: arrivalAtDestination,
						duration: duration,
						totalDistance:
							-distance[trainNumber][origin].distance + distance[trainNumber][destination].distance,
						day: day,
					});
				}
			} catch (error) {
				continue;
			}
		}

		return directTrains;
	};

	this.reachingDate = function(boardingDate, originDeparture, connectionDuration, originDuration) {
		var convertor = {
			jan: 'january',
			feb: 'february',
			mar: 'march',
			apr: 'april',
			may: 'may',
			jun: 'june',
			jul: 'july',
			aug: 'august',
			sep: 'september',
			oct: 'october',
			nov: 'november',
			dec: 'december',
		};
		var monthDays = {
			january: 31,
			february: 28,
			march: 31,
			april: 30,
			may: 31,
			june: 30,
			july: 31,
			august: 31,
			september: 30,
			october: 31,
			november: 30,
			december: 31,
		};
		var monthToIndex = {
			january: 0,
			february: 1,
			march: 2,
			april: 3,
			may: 4,
			june: 5,
			july: 6,
			august: 7,
			september: 8,
			october: 9,
			november: 10,
			december: 11,
		};
		var indexToMonth = {
			0: 'january',
			1: 'february',
			2: 'march',
			3: 'april',
			4: 'may',
			5: 'june',
			6: 'july',
			7: 'august',
			8: 'september',
			9: 'october',
			10: 'november',
			11: 'december',
		};

		const connectionTimes = connectionDuration.split(':');
		const originTime = originDuration.split(':');

		const connectionMin = parseInt(connectionTimes[1], 10);
		const originMin = parseInt(originTime[1], 10);
		const connectionHr = parseInt(connectionTimes[0], 10);
		const originHr = parseInt(originTime[0], 10);
		const minuteDiff = connectionMin - originMin;
		var carryDur = 0;
		if (minuteDiff < 0) {
			carryDur = 1;
		}
		const durationMinutes = (minuteDiff % 60 + 60) % 60;
		const durationHours = connectionHr - originHr - carryDur;

		const originTimes = originDeparture.split(':');

		const originHours = parseInt(originTimes[0], 10);
		const originMinutes = parseInt(originTimes[1], 10);

		const minuteAddition = durationMinutes + originMinutes;
		const carryFromMinutes = Math.floor(minuteAddition / 60);

		const hourAddition = originHours + carryFromMinutes + durationHours;
		const shiftInDay = Math.floor(hourAddition / 24);

		const dateSplit = boardingDate.split(' ');
		const date = parseInt(dateSplit[0].slice(0, 2), 10);
		var month = dateSplit[1];
		month = month.length === 3 ? convertor[month] : month;
		const year = parseInt(dateSplit[2], 10);

		const dateShift = date + shiftInDay;
		const dateCarry = Math.floor((date + shiftInDay) / monthDays[month]);
		const newDate = dateShift % monthDays[month];

		const newMonthIndex = (monthToIndex[month] + dateCarry) % 12;

		const newMonth = indexToMonth[newMonthIndex];

		return {
			shiftInDay: newDate.toString() + ' ' + newMonth.toString(),
			duration: durationHours.toString() + ':' + durationMinutes.toString(),
		};
	};
};
