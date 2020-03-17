const trainsVisitingStation = require('../data/trainsVisitngStation.json');


module.exports = function(){

    this.directTrainsBetweenTwoStations = function(origin,destination){
        
        var originTrains = trainsVisitingStation.trains[origin];
        var destinationTrains = trainsVisitingStation.trains[destination];

        var directTrains = [];

        for(key in originTrains)
        {
            if(destinationTrains[key] !== null)
            {
                directTrains.push(key);
            }
        }
       
        return {"direct":directTrains};
    }
}