const trainsVisitingStation = require('../data/trainsVisitngStation.json');
const distance = require('../data/distance.json');
const trainNumberToName = require('../data/train_number_to_name.json');
const nearbyStations=require('../data/NearbyStations.json');
const runningDays = require('../data/runningDays.json');

module.exports = function(){

    this.directTrainsFromNearbyStations = (actualOrigin,actualDestination, date)=>{
        var directTrains = [];
        
        var nearbyStationIncludeOrigin=nearbyStations[actualOrigin];
        nearbyStationIncludeOrigin.push(actualOrigin);
        var nearbyStationIncludeDestination=nearbyStations[actualDestination];
        nearbyStationIncludeDestination.push(actualDestination);

        var date = new Date(date);
        var day = date.getDay();
        var keepTrackOfTrains = {};

        for(index in nearbyStationIncludeOrigin)
        {
            var nearbyOrigin=nearbyStationIncludeOrigin[index]
            var nearbyOriginTrains = trainsVisitingStation.trains[nearbyOrigin];
            
            for(index in nearbyStationIncludeDestination)
                {
                    var nearbyDestination=nearbyStationIncludeDestination[index];
                    if((nearbyDestination===actualDestination && nearbyOrigin===actualOrigin)
                      || (nearbyDestination!==actualDestination && nearbyOrigin!==actualOrigin))
                    {
                        continue;
                    }
                    var nearbyDestinationTrains = trainsVisitingStation.trains[nearbyDestination];
                    for(trainNumber in nearbyOriginTrains)
                     {
                        if (nearbyDestinationTrains !== undefined && 
                            nearbyDestinationTrains[trainNumber] !== undefined &&
                            (parseInt(distance.trains[trainNumber][nearbyOrigin].distance,10) < 
                            parseInt(distance.trains[trainNumber][nearbyDestination].distance,10))
                            && keepTrackOfTrains[trainNumber]===undefined)
                                {
                                    
                                    try
                                    {
                                        if(runningDays[nearbyOrigin][trainNumber][day] === true)
                                        {
                                            console.log(runningDays[nearbyOrigin][trainNumber][day])
                                            console.log(trainNumber);
                                            var utcTime = new Date(trainsVisitingStation.trains[nearbyOrigin][trainNumber]);
                                            var time = ("0"+utcTime.getUTCHours()).slice(-2) + ":" + ("0"+utcTime.getUTCMinutes()).slice(-2);

                                            directTrains.push({origin: nearbyOrigin, destination: nearbyDestination,
                                                number: trainNumber, name: trainNumberToName[trainNumber],
                                                originDepartTime: time});
                                            
                                            keepTrackOfTrains[trainNumber]=true;
                                        }
                                    }
                                    catch(err)
                                    {
                                        continue;
                                    }
                            
                                }
                    }
                }
       }
        return {"direct":directTrains};
    }
}
