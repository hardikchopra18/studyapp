const User=require("../Models/Users");
const Profile=require("../Models/Profile");


const updateinfo=async(req,res)=>{
    try{
      
        const {firstname,Lastname,dateofbirth,gender,phonenumber,about}=req.body;
        const id=req.user.id;
        const finduser=await User.findById(id);
        
        if(!finduser){
            return res.json({
                success:false,
                message:"user didnot exsist"
            })
        }
         
        const update={
                phonenumber,
                dob:dateofbirth,
                about,
                gender
            
        };
        const findprofile=await Profile.findByIdAndUpdate(finduser.Profile,update,{
            new:true
        });
         
        const updatedname={
            firstname,
            Lastname
        }
        let updateduser=await User.findByIdAndUpdate(id,updatedname,{
            new:true
        }).populate("Profile").exec();
         updateduser=updateduser.toObject();
         updateduser.password=undefined;
         updateduser.confirmpassword=undefined;
        //  console.log(updateduser);
    
        res.json({
            success:true,
            message:"profile updated successfully",
            update:updateduser
        });
       
    }
    catch(err){
        console.log(err);
        console.log("error agya jii");
    }
    
}

module.exports=updateinfo;