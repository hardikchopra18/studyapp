// Require the Cloudinary library
const cloudinary = require('cloudinary').v2

const cloudconnect=async()=>{
    try{
       cloudinary.config({ 
       cloud_name: process.env.CLOUD_NAME, 
       api_key: process.env.API_KEY, 
       api_secret: process.env.API_SECRET,
       secure: true
      });
      console.log("cloud connected successfully");
    }
  catch(err){
    console.log(err);
    console.log("cloud didnot connected");
  }
} 

module.exports=cloudconnect;