const mongoose = require('mongoose');
const {ObjectId}= mongoose.Schema.Types;
const Schema=new mongoose.Schema(
  {
    TrainNumber:{type:Number,required:true},
    Punctuality:{type:Number,required:true},
    Cleanliness:{type:Number,required:true},
    Pantry:{type:Number,required:true},
    Overall:{type:Number,required:true},
    Issues:{type:String},
    //user:{type:ObjectId,ref:"UserSchemaName"}
  }
)
mongoose.model("Feedback",Schema);
