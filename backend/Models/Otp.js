const mongoose=require("mongoose");
const sendMail = require("../Midlewares/Sendmail");

const OtpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires: 10*60
    }
});

const sendmail=async (email,otp)=>{
        try{
            const mail=await sendMail(email,otp);
            console.log("mail sent---> ",mail);
        }
        catch(err){
            console.log("error occured while sending otp email....");
            console.log(err);
        }
}

OtpSchema.pre("save",async function (next){
    // console.log(this.email,this.otp);
   const response= await sendmail(this.email,this.otp);
   console.log(response);
    next();
});
module.exports=mongoose.model("Otp",OtpSchema);
