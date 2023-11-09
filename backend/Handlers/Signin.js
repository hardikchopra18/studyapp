const User = require("../Models/Users");
const bcrypt = require("bcrypt");
const jwt=require("jsonwebtoken");
require("dotenv").config();

const signin = async (req, res) => {
  try {
    const { email, password } = req.body;
    let data = await User.findOne({ email }).populate("Profile").exec();
    // await data.populate("Profile").exec();
    console.log(data);
    if(!data){
       res.json({
        errors:"user doesnot exsists"
      })
    }
    else{
      const comparePassword = await bcrypt.compare(password, data.password);
      console.log(comparePassword);  
      if(!comparePassword){
         res.json({
          success:false,
          message:"incorrect password",
          // errors:"please check password"
        })
      }
      else{
        const payload={
          id:data.id,
          email:data.email,
          role:data.
          accountType
        }
        console.log(data);
        console.log(typeof data);
        data=data.toObject();
        data.password=undefined;
        data.confirmpassword=undefined;
        
        
        console.log(data);
        const token=jwt.sign(payload,process.env.JSON_SECRET);
        res.cookie("token",token).json({
          success: true,
          message: "logged in",
          token,
          data
        }); 
      }
    }

  } 
  catch (err) {
    res.send({
      success:"false",
      message:"server is down currently try again later"
    })
    console.log(err);
    console.log("Error in Signin handler");
  }
};

module.exports = signin;
