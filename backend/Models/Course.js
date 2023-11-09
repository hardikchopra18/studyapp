const mongoose=require("mongoose");

const CourseSchema=new mongoose.Schema({
     title:{
        type:String,
        required:true
     },
     description:{
        type:String,
        required:true
     },
     price:{
        type:Number,
        required:true
     },
     category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
     },
     Tags:[String],
     Section:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Section"
     }],
     thumbNail:{
        type:String,
        required:true
     },
     prerequist:{
        type:String,
        required:true
     },
     instructions:{
        type:String,
        required:true
     }

});

module.exports=mongoose.model("Course",CourseSchema);