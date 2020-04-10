const express = require("express");
const router  = express.Router();

require('../algorithms/singleBreakTrainsFromNearbyStations.js')();
require('../algorithms/stationCodeValidator.js')();

router.get('/:origin/:destination', (req,res,next)=>{

    var origin = req.params.origin.toUpperCase();
    var destination = req.params.destination.toUpperCase();


    if(stationCodeValidator(origin, destination))
    {
        res.status(200).json(singleBreakTrainsFromNearbyStations(origin,destination));
    }
    else
    {
        res.status(404).json("Invalid Station Details");
    }
});




module.exports = router;
