const trainsVisitingStation = require('../data/trainsVisitngStation.json');
const distance = require('../data/distance.json');
const trainNumberToName = require('../data/train_number_to_name.json');


module.exports = function(){

    this.directTrainsBetweenTwoStations = (origin,destination)=>{
        
        var originTrains = trainsVisitingStation.trains[origin];
        var destinationTrains = trainsVisitingStation.trains[destination];
        
        var directTrains = [];

        for(trainNumber in originTrains)
        {
            if(destinationTrains[trainNumber] !== undefined && 
            (parseInt(distance.trains[trainNumber][origin].distance,10) < parseInt(distance.trains[trainNumber][destination].distance,10)))
            {
                directTrains.push({number: trainNumber, name: trainNumberToName[trainNumber]});
            }
        }
       
        return {"direct":directTrains};
    }
}