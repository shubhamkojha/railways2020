const express = require("express");
const router  = express.Router();
const mongoose = require("mongoose");

const data = require("../data/data.json");
require('../algorithms/trainBetweenTwoStations')();

router.get('/:origin/:destination', function(req,res,next){

    var origin = req.params.origin;
    var destination = req.params.destination;
    
    res.status(200).json(trainBetweenTwoStations(origin,destination));
    next();
});




module.exports = router;