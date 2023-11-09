const mongoose=require("mongoose");

const UserSchema=new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
    },
    Lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    confirmpassword:{
        type:String,
        required:true,
    },
    Profile:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Profile"
    },
    courses:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Course"
        }
    ],
    profilePicture:{
        type:String,
        require:true        
    },
    accountType:{
        type:String,
        enum:["Student","Instructor","Admin"],
        required:true
    },
    courseprogress:
        [
            {
                type:mongoose.Schema.Types.ObjectId,
                ref:"CourseProgress"
            }
        ]   
    
});

module.exports=mongoose.model("User",UserSchema);