const nodemailer=require("nodemailer");

const sendMail=async (email,body)=>{
    try{
        const mailTransporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            auth: {
                user: 'hardikchopra70@gmail.com',
                pass: "cljxhzngthtvgmnc"
            }
        });
         
        const mailDetails = {
            from: 'hardikchopra70@gmail.com',
            to: `${email}`,
            subject: "testing",
            html: `${body}`
        };
         
         mailTransporter.sendMail(mailDetails, function(err, data) {
            if(err) {
                console.log(err);
                console.log('Error Occurs');
            } else {
                console.log('Email sent successfully');
            }
        });
    }
    catch(err){
        console.log(err);
        console,log("error in sending mail");
    }
}

module.exports=sendMail;