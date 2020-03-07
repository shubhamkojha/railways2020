const stationCodetoName = require('../data/stationCodetoName.json');

module.exports = function(){

    this.stationCodeValidator = function(origin, destination)
    {
        if(stationCodetoName[origin.toUpperCase()] !== undefined && stationCodetoName[destination.toUpperCase()] !== undefined)
        {
            return true;
        }
        
        return false;
    }
}