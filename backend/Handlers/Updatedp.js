const User=require("../Models/Users");
const uploadimage=require("../Midlewares/Uploadimage");





const updatedp= async(req,res)=>{
     try{
      console.log(req.body);
        // fetch data from post call
       const {id}=req.body;

       const image=req.files.file;
       if(!image){
        return res.json({
          success:false,
          messgae:"choose a new image first"
        })
       }
        
      const response=await uploadimage(image);
      
      console.log(response);
      const update={
        profilePicture:response.url
      };
      let updatedp= await User.findByIdAndUpdate(id,update,{
        new:true
      }).populate("Profile").exec();
      updatedp=updatedp.toObject();
      updatedp.password=undefined;
      updatedp.confirmpassword=undefined;
      console.log(updatedp);
      
      res.json({
        success:"true",
        message:"hogya bhai",
        update:updatedp 
      })
      }
     catch(err){
      console.log("error in image upload controller");
      console.log(err);
     }

};



// module.exports=Localfileupload;
module.exports=updatedp;
