const Users=require("../Models/Users");
const Otp=require("../Models/Otp");
const otpGenerator=require("otp-generator");
const sendMail=require("../Midlewares/Sendmail");

const SendOtp=async(req,res)=>{
  try{
    console.log("inside sendotp");
    const email=req.body.email;
    if(!email||email===""){
        return res.json({
            success:false,
            message:"please enter a valid email address"
        });
    }

    const data=await Users.findOne({email});
    console.log(data); 
    if(data){
     return  res.json({
        success:false,
        message:"User already exsists"
       }); 
    }
    else{
        const generatedOtp=otpGenerator.generate(6,{
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
             specialChars: false 
        });
    
        console.log("generated otp-->",generatedOtp);
        console.log(email);
        console.log( generatedOtp);
         const Otpsaved=await Otp.create({
            email,
            otp:generatedOtp
         });
         console.log("saved reference->",Otpsaved);
         
         res.json({
            success:true,
            message:"Otp sent successfully"
         })
    }
  }
  catch(err){
     console.log(err);
     console.log("error agya ji");
  } 

}
module.exports=SendOtp;