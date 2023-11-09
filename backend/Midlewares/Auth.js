const jwt=require("jsonwebtoken");
require("dotenv").config();

exports.auth= (req,res,next)=>{
    try{
        const token=req.body.token||req.cookies.token;
        console.log("token received in auth------->",token);
        if(!token||token===undefined){
            // console.log("hiiiiiiiiiiiiiiiii");
            return res.json({
                success:"false",
                message:"token missing"
            })
        }
        try{
            const payload=jwt.verify(token,process.env.JSON_SECRET);
            console.log("payload-->",payload);

            req.user=payload;
            console.log(req.user);
            next();
        }
        catch(err){
            console.log(err);
            console.log("error occurred while authenticating user");
           return res.json({
                success:false,
                message:"token is missing"
            })
        }
    }
    catch(err){
        console.log(err);
        console.log("error in auth");
    }
    
}


// 

exports.isInstructor=(req,res,next)=>{
    try{
        if(req.user.role!=="Instructor"){
           return res.json({
                success:"false",
                message:"private route for instrutor"
            })
        }
        else{
            next();
        }
    }
    catch(err){
        console.log(err);
        console.log("error in istudent");
    }
    // next();
}

