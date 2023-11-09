const Course = require("../Models/Course");
const uploadimage = require("../Midlewares/Uploadimage");
const Category = require("../Models/Category");
const User = require("../Models/Users");

const updatecourse = async (req, res) => {
  try {
    console.log("inside course creation");
    const {
      title,
      description,
      price,
      category,
      Tags,
      prerequist,
      instructions,
      courseid
    } = req.body;
    const { thumbNail } = req.files;
    const id = req.user.id;
    console.log(
      title,
      description,
      price,
      category,
      Tags,
      prerequist,
      instructions,
      courseid
    );

    if (
      !title ||
      !description ||
      !price ||
      !Category ||
      !Tags ||
      !prerequist ||
      !thumbNail ||
      !instructions
    ) {
      return res.json({
        success: false,
        messgae: "all fields are requried",
      });
    }
    const response = await uploadimage(thumbNail);
    // console.log(response);
    const updatedCourse = await Course.findByIdAndUpdate(courseid,{
      title,
      description,
      price,
      category,
      Tags,
      prerequist,
      instructions,
      thumbNail: response.url,
    },{
        new:true
    });

    console.log(updatedCourse);
    // console.log("id of user--->", id);
    // console.log("typeof id of user--->", typeof id);

    const instructor = await User.findOne(
      { _id: id });
    console.log("final data----->", instructor);

    return res.status(200).json({
      updatedCourse,
      instructor,
      success: true,
      message: "course updated successfully",
    });
  } catch (err) {
    console.log(err);
    console.log("error occurred while updating course");
  }
};

module.exports = updatecourse;
