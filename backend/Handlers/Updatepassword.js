const User=require("../Models/Users");
const bcrypt=require("bcrypt");
const updatepassword=async (req,res)=>{
 try{
    const {currentpassword,newpassword}=req.body;
    const id=req.user.id;
    if(!currentpassword||!newpassword){
        return res.json({
            success:false,
            messgae:"both fields are requried while updating password"
        });
    }
    const user=await User.findById(id);
    const comparepassword=await bcrypt.compare(currentpassword,user.password);
    if(comparepassword){
        const newpass=await bcrypt.hash(newpassword,10);
        const updateduserdata=await User.findByIdAndUpdate(id,{
            password:newpass
        },{
            confirmpassword:newpass
        },{
            new:true
        });

        if(updateduserdata){
            return res.json({
                success:true,
                message:"password updated successfully"
            })
        }
    }
    else{
        return res.json({
            success:false,
            message:"incorrect password"
        })
    }
 }catch(err){
    console.log("error while updating password");
    console.log(err);
    return res.json({
       success:false,
       message:"error occured while updating password" 
    });
 }
}

module.exports=updatepassword;

