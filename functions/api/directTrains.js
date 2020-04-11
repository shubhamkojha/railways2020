const express = require("express");
const router  = express.Router();

require('../algorithms/directTrainsBetweenTwoStations.js')();
require('../algorithms/stationCodeValidator.js')();
require('../algorithms/directTrainsFromNearbyStations.js')();

router.post('/', (req,res,next)=>{
    
    var origin = req.body.origin.toUpperCase();
    var destination = req.body.destination.toUpperCase();
    var date = req.body.date;
    try
    {
        if(stationCodeValidator(origin, destination))
        {
            res.status(200).json(directTrainsBetweenTwoStations(origin,destination,date));
        }
    }
    catch(error)
    {
        res.status(404).json(error);
    }
    next();
    
});

router.post('/from-nearby-stations', (req,res,next)=>{

    var origin = req.body.origin.toUpperCase();
    var destination = req.body.destination.toUpperCase();
    var date = req.body.date;

    if(stationCodeValidator(origin, destination))
    {
        res.status(200).json(directTrainsFromNearbyStations(origin,destination,date));
    }
    else
    {
        res.status(404).json("Invalid Station Details");
    }
    next();

});




module.exports = router;