const data = require('../data/data.json');
require('./alternateRoutes.js')();

module.exports = function(){

    this.trainBetweenTwoStations = function(origin,destination){
        
        var originTrains = data.trains[origin];
        var destinationTrains = data.trains[destination];

        var directTrains = [];

        for(key in originTrains)
        {
            if(destinationTrains[key] != null)
            {
                directTrains.push(key);
            }
        }
        if(directTrains.length > 0)
        {
            return {"direct":directTrains};
        }
        const indirectTrains = alternateRoutes(origin, destination);
        return {"direct":directTrains, "indirect":indirectTrains};
    }
}