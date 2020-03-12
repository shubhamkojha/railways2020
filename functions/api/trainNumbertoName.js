const express = require('express');
const router  = express.Router();

const trainNumbertoName = require('../data/train_number_to_name.json');

router.get('/:trainNumber', function(req,res,next){
    const trainNumber = req.params.trainNumber;
    const trainName = trainNumbertoName[trainNumber];
    if(trainName !== undefined)
    {
        res.status(200).json(trainName[0]);
    }
    else
    {
        res.status(200).json("Invalid Train Details");
    }
});

module.exports = router;
