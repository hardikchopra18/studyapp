const mongoose=require("mongoose");

const subSectionSchema=new mongoose.Schema({
     sectionId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
     },
     name:{
        type:String,
        required:true
     },
     videoUrl:{
        type:String,
        required:true
     },
     timeDuration:{
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true
     },
});

module.exports=mongoose.model("SubSection",subSectionSchema);