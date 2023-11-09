const mongoose=require("mongoose");

const ProfileSchema=new mongoose.Schema({
    gender:{
        type:String,
    },
    dob:{
        type:Date
    },
    address:{
        type:String
    },
    phonenumber:{
        type:Number
        // required:true,
    },
    about:{
        type:String
    }
    
});


module.exports=mongoose.model("Profile",ProfileSchema);



