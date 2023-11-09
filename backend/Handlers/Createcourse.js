const Course = require("../Models/Course");
const uploadimage = require("../Midlewares/Uploadimage");
const Category = require("../Models/Category");
const User = require("../Models/Users");

const createcourse = async (req, res) => {
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
      instructions
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
    const createdCourse = await Course.create({
      title,
      description,
      price,
      category,
      Tags,
      prerequist,
      instructions,
      thumbNail: response.url,
    });

    console.log(createdCourse);
    console.log("id of user--->", id);
    console.log("typeof id of user--->", typeof id);

    const instructor = await User.findByIdAndUpdate(
      { _id: id },
      {
        $push: { courses: createdCourse._id },
      },
      {
        new: true,
      }
    );
    console.log("final data----->", instructor);

    return res.status(200).json({
      createdCourse,
      instructor,
      success: true,
      message: "course created successfully",
    });
  } catch (err) {
    console.log(err);
    console.log("error occurred while creating course");
  }
};

module.exports = createcourse;
