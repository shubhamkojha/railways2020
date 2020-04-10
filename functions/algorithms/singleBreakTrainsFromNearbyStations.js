const alternateRouteData = require('../data/alternateRoutes.json');
const trainsVisitingStation = require('../data/trainsVisitngStation.json');
const distanceData = require('../data/distance.json');
const distance = require('../data/distance.json');
const trainNumberToName = require('../data/train_number_to_name.json');
const nearbyStations=require('../data/NearbyStations.json');
function FindKey_in_givenArray(array,key)
{
  for(i in array)
  if(array[i]==key)
  return true;
  return false;
}
module.exports = function(){

    this.singleBreakTrainsFromNearbyStations = function(Origin, Destination){
        const result = [];
        var minDistance=100000;
        var nearbyStationIncludeOrigin=nearbyStations[Origin];
        nearbyStationIncludeOrigin.push(Origin);
        var nearbyStationIncludeDestination=nearbyStations[Destination];
        nearbyStationIncludeDestination.push(Destination);
        for(key in alternateRouteData.trains)
        {
            const betweenOriginandConnection = [];
            const betweenConnectionandDestination = [];
            var distanceOriginConnection;
            var distanceConnectionDestination;
            var totalDistance;
            for(i in nearbyStationIncludeOrigin)
              {
                var origin =nearbyStationIncludeOrigin[i];
                for(train in trainsVisitingStation.trains[origin])
                {

                    if(alternateRouteData.trains[key][train] !== undefined && key !== origin && !FindKey_in_givenArray(nearbyStationIncludeDestination,key)&&
                    (parseInt(distance.trains[train][origin].distance,10) < parseInt(distance.trains[train][key].distance,10)))
                    {
                        distanceOriginConnection = Math.abs(parseInt(distanceData.trains[train][key].distance,10)-
                        parseInt(distanceData.trains[train][origin].distance),10);
                        betweenOriginandConnection.push({origin:origin,number: train, name: trainNumberToName[train]});
                    }
                }
              }
            for(j in nearbyStationIncludeDestination)
              {
                var destination=nearbyStationIncludeDestination[j];
                for(train in trainsVisitingStation.trains[destination])
                {
                    if(alternateRouteData.trains[key][train] !== undefined && key !== destination && !FindKey_in_givenArray(nearbyStationIncludeOrigin,key)&&
                    (parseInt(distance.trains[train][key].distance,10) < parseInt(distance.trains[train][destination].distance,10)))
                    {

                        distanceConnectionDestination = Math.abs(parseInt(distanceData.trains[train][key].distance,10)-
                        parseInt(distanceData.trains[train][destination].distance),10);
                        betweenConnectionandDestination.push({destination:destination,number: train, name: trainNumberToName[train]});
                    }
                }
              }

                if(betweenConnectionandDestination.length !== 0 && betweenOriginandConnection.length !== 0)
                {
                    totalDistance = distanceOriginConnection+distanceConnectionDestination;
                    if(minDistance > totalDistance)
                    {
                        minDistance=totalDistance;
                    }
                    result.push({"connection": key,
                    "distance":totalDistance,
                     "origin-connection": betweenOriginandConnection, "connection-destination"
                    :betweenConnectionandDestination});
                }

        }

        return filterByDistance(result,minDistance);
    }

    this.filterByDistance = function(results, minDistance)
    {

        const result = [];
        for(key in results)
        {

            if(minDistance < 1000 && results[key].distance <= 1.1*minDistance)
            {result.push(results[key]);}
            if(minDistance > 1000 && results[key].distance <= 1.03*minDistance)
            {
                result.push(results[key]);
            }

        }
        return result;
    }


}
