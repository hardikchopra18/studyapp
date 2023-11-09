
const Category=require("../Models/Category");

const createcategory=async(req,res)=>{
    try{
      const {name}=req.body;
      const newcategory=await Category.create({
        name
      });
      console.log(newcategory);
      res.json({
        success:true,
        message:"category created successfully",
        newcategory
      });

    }catch(err){
        console.log(err);
        console.log("error occured while creating category");
    }
}

module.exports=createcategory;