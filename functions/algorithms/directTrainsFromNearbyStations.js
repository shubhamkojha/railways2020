const trainsVisitingStation = require('../data/trainsVisitngStation.json');
const distance = require('../data/distance.json');
const trainNumberToName = require('../data/train_number_to_name.json');
const nearbyStations=require('../data/NearbyStations.json');

module.exports = function(){

    this.directTrainsFromNearbyStations = (Origin,Destination)=>{
        var directTrains = [];
        var nearbyStationIncludeOrigin=nearbyStations[Origin];
        nearbyStationIncludeOrigin.push(Origin);
        var nearbyStationIncludeDestination=nearbyStations[Destination];
        nearbyStationIncludeDestination.push(Destination);
        for(i in nearbyStationIncludeOrigin)
        {
            var origin=nearbyStationIncludeOrigin[i]
            var originTrains = trainsVisitingStation.trains[origin];
            for(j in nearbyStationIncludeDestination)
                {
                  var destination=nearbyStationIncludeDestination[j];
                 var destinationTrains = trainsVisitingStation.trains[destination];
                 for(trainNumber in originTrains)
                     {
                     if(destinationTrains !== undefined&&destinationTrains[trainNumber] !== undefined&&
                     (parseInt(distance.trains[trainNumber][origin].distance,10) < parseInt(distance.trains[trainNumber][destination].distance,10)))
                        {
                        directTrains.push({origin:origin,destination:destination,number: trainNumber, name: trainNumberToName[trainNumber]});
                        }
                      }
                  }
       }

        return {"direct":directTrains};
    }
}
