const express=require("express");
const router=express.Router();
const authroization=require("../Midlewares/Auth");
// handlers
const signin=require("../Handlers/Signin");
const signup=require("../Handlers/Signup");
const SendOtp=require("../Handlers/Otpsend");
const updatedp=require("../Handlers/Updatedp");
const updateinfo=require("../Handlers/Updateprofileinfo");
const createcourse=require("../Handlers/Createcourse");
const createcategory=require("../Handlers/Createcategory");
const updatecourse=require("../Handlers/Updatecourse");
const updatepassword=require("../Handlers/Updatepassword");
const getcategory=require("../Handlers/Getcategory");
//routes 
router.post("/sendotp",SendOtp);
router.post("/signup",signup);
router.post("/signin",signin);
router.post("/updatedp",updatedp);
router.post("/updateprofile",authroization.auth,updateinfo);
router.post("/update-password",authroization.auth,updatepassword);
router.post("/create-course",authroization.auth,authroization.isInstructor,createcourse);
router.post("/update-course",authroization.auth,authroization.isInstructor,updatecourse);
router.post("/create-category",createcategory);
router.get("/get-category",getcategory);

module.exports=router;

