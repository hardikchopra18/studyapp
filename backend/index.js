const express=require("express");
const app=express();
require("dotenv").config();
const fileUpload=require("express-fileupload");
const cookieParser=require("cookie-parser");

const port=process.env.PORT_NO||4000;


app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})
app.use(fileUpload({
    useTempFiles : true,
    tempFileDir : '/tmp/'
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({
    extended:true,
}));

app.listen(port,(req,res)=>{
      console.log("serverd started at" ,port);
});
app.get("/",async(req,res)=>{
    res.json({
        success:true,
        message:"hello baby"
    })
});



const router=require("./Routers/Form");
app.use(router);

const dbconnect=require("./Configuration/dbconnect");
dbconnect();

const cloudconnect=require("./Configuration/cloudConnect");
cloudconnect();