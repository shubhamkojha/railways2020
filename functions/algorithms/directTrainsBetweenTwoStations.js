const trainsVisitingStation = require('../data/trainsVisitngStation.json');
const distance = require('../data/distance.json');
const trainNumberToName = require('../data/train_number_to_name.json');
const runningDays = require('../data/runningDays.json');

module.exports = function(){

    this.directTrainsBetweenTwoStations = (origin,destination, date)=>{
        
        var originTrains = trainsVisitingStation.trains[origin];
        var destinationTrains = trainsVisitingStation.trains[destination];
        var date = new Date(date);
        var day = date.getDay();
        var directTrains = [];

        for(trainNumber in originTrains)
        {
            if(destinationTrains[trainNumber] !== undefined && 
            (parseInt(distance.trains[trainNumber][origin].distance,10) 
            < parseInt(distance.trains[trainNumber][destination].distance,10)))
            {
                try
                {
                    if(runningDays[origin][trainNumber][day] === true)
                    {
                        var utcTime = new Date(trainsVisitingStation.trains[origin][trainNumber]);
                        var time = ("0"+utcTime.getUTCHours()).slice(-2) + ":" + ("0"+utcTime.getUTCMinutes()).slice(-2)
                        directTrains.push({number: trainNumber, name: trainNumberToName[trainNumber],
                        originDepartTime: time});
                    }
                }
                catch(err)
                {
                    continue;
                }
            }
        }
       
        return {"direct":directTrains};
    }
}