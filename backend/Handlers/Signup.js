const User = require("../Models/Users");
const bycrypt = require("bcrypt");
const Otp=require("../Models/Otp");
const sendMail =require("../Midlewares/Sendmail");
const Profile = require("../Models/Profile");
const signup = async (req, res) => {
  try {
    const { firstname,lastname,role, email, password,confirmPassword,otp } = req.body;
    if(!firstname||!lastname||!email||!password||!confirmPassword,!otp){
      return res.json({
          success:false,
          message:"all fields are required"
      })
    }
    const data = await User.find({ email });
    if (data.length !== 0) {
      return res.json({
        success: false,
        message: "user already exsists",
      });
    } 
      // verify otp
      const savedotp=await Otp.find({email}).sort({CreatedAt:-1}).limit(1);
      console.log(savedotp);
      if(savedotp.length===0){
        return res.json({
          success: false,
          message: "otp not found",
        });
      }
      if(savedotp[0].otp!==otp){
        return res.json({
          success: false,
          message: "enter a valid otp",
        }); 
      }
      if(savedotp[0].otp===otp){
        const salt = 10;
        const hashedpassword = await bycrypt.hash(password, salt);
        const temporaryProfile=await Profile.create({
          gender:null,
          dob:null,
          address:null,
          phonenumber:null,
          about:null
        });

        const newdata = await User.create({
        firstname,
        Lastname:lastname,
        accountType:role,
        email,
        Profile:temporaryProfile.id,
        password: hashedpassword,
        profilePicture:`https://api.dicebear.com/6.x/initials/svg?seed=${firstname}+${lastname}`,
        confirmpassword:hashedpassword
       });
       res.json({
        success: true,
        message: "saved entry",
      });
    
      }
          
  } catch (err) {
    console.log(err);
    console.log("Error in Signup handler");
  }
};

module.exports = signup;
