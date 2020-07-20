const express = require("express");
const router  = express.Router();
const mongoose = require('mongoose');
require('../models/feedback.js');
require('../models/train_rank.js');
const Feedback = mongoose.model("Feedback");
const Rank=mongoose.model("Rank");
require('../algorithms/rank_train.js')();


router.get('/',(req,res)=>{
  Rank.find().sort({Rank:-1}).
  then(files=>{

    res.send(files);
  }).catch(err=>{console.log(err);});
})


router.post('/fillFeedback',(req,res)=>{
  const {TrainNumber,Punctuality,Cleanliness,Pantry,Overall,Issues}= req.body;
  const data={TrainNumber,Punctuality,Cleanliness,Pantry,Overall,Issues};

            Feedback.create(data).then((file)=>
            {
              Rank.findOne({TrainNumber:TrainNumber})
              .then((RankSchema)=>
              {
                if(RankSchema)
                 {
                   const ModifiedData=calculate_Modified_Data(RankSchema,data);
                   ModifiedData.Rank=calculate_Rank(RankSchema.PunctualityModified,RankSchema.CleanlinessModified,
                   RankSchema.PantryModified,RankSchema.OverallModified);
                   /*console.log(calculate_Rank(RankSchema.PunctualityModified,RankSchema.CleanlinessModified,
                   RankSchema.PantryModified,RankSchema.OverallModified));*/
                   RankSchema.remove();
                   Rank.create(ModifiedData).then((SavedData)=>{res.send(SavedData)}).catch(err=>{console.log(err);})
                 }
                else
                {
                  let RankAsPerUser=calculate_Rank(Punctuality,Cleanliness,Pantry,Overall);
                  const Rankdata={TrainNumber,
                    PunctualityModified:Punctuality,
                    CleanlinessModified:Cleanliness,
                    PantryModified:Pantry,
                    OverallModified:Overall,
                    Rank:RankAsPerUser,
                    Count:1,
                    Issues};
                Rank.create(Rankdata).then((SavedData)=>{res.send(SavedData)}).catch(err=>{console.log(err);})
              }
            })
            .catch(err=>{console.log(err);});

       }).catch(err=>{console.log(err);});
});


module.exports = router;
