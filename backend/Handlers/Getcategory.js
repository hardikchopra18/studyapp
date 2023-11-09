const Category=require("../Models/Category");

const getcategory=async(req,res)=>{
    try{
      const allcategories=await Category.find({});
      if(allcategories.length===0){
        return res.json({
            success:false,
            messgae:"create a category first",
          });
      }
      return res.json({
        success:true,
        messgae:"fetched successfully",
        allcategories
      })        

    }catch(err){
        console.log(err);
        console.log("error occured while fetching category");
    }
}

module.exports=getcategory;