const express = require("express");
const router  = express.Router();

const stationCodetoName = require("../data/stationCodetoName.json");

router.get('/:stationDetail', function(req, res, next){
    const stationNamefromCode = stationCodetoName[req.params.stationDetail.toUpperCase()];
    
    if(stationNamefromCode !== undefined)
    {
        res.status(200).json(stationNamefromCode);
    }
    else
    {
        res.status(200).json("Invalid Details");
        next();
    }
});


module.exports = router;