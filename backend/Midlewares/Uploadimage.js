const cloudinary=require('cloudinary').v2


const uploadimage = async (image) => {
  try {
    const extension = image.name.split(".")[1];
    console.log(extension);

    // validate images extension
    const supportedimagetype = ["jpeg", "png", "jpg"];

    if (!validextension(extension, supportedimagetype)) {
     return  res.json({
        success: "false",
        message: "file type not supported",
      });
    }

    const response = await uploadtocloud(image, "badebhaiya");
    return response;
    
  } catch (err) {
    // upload image to cloudinary
    console.log(err);
    console.log("error agya uploadimage");
  }
};

function validextension(extension, supportedtype) {
  return supportedtype.includes(extension);
}

const uploadtocloud = async (file, folder) => {
  const options = { folder };
  return await cloudinary.uploader.upload(file.tempFilePath, options);
};

module.exports=uploadimage;