const mongoose = require('mongoose');

const Schema=new mongoose.Schema(
  {
    TrainNumber:{type:Number,required:true},
    PunctualityModified:{type:Number,required:true},
    CleanlinessModified:{type:Number,required:true},
    PantryModified:{type:Number,required:true},
    OverallModified:{type:Number,required:true},
    Rank:{type:Number,required:true},
    Count:{type:Number},
    Issues:{type:String}

  }
)
mongoose.model("Rank",Schema);
