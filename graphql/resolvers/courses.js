const mongoose = require("mongoose");

const Category = require("../../models/category");
const User = require("../../models/user");
const Course = require("../../models/course");

const { transformCourse } = require("../helper/helper");

module.exports = {
  courses: async () => {
    try {
      const courses = await Course.find();
      return courses.map(course => {
        return transformCourse(course);
      });
    } catch (error) {
      throw error;
    }
  },
  createCourse: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    inputTitle = args.courseInput.title.toLowerCase();
    inputDescription = args.courseInput.description;
    inputCourseType = args.courseInput.courseType;
    inputPrice = args.courseInput.price;
    inputTotalMaxStudent = args.courseInput.totalMaxStudent;
    inputAddress = args.courseInput.address;
    inputCategory = args.courseInput.categoryId;
    userId = req.userId;
    const course = new Course({
      title: inputTitle,
      description: inputDescription,
      courseType: inputCourseType,
      price: inputPrice,
      totalMaxStudent: inputTotalMaxStudent,
      address: inputAddress,
      category: inputCategory,
      createdBy: userId
    });

    try {
      let createdCourse;

      if (!mongoose.Types.ObjectId.isValid(inputCategory)) {
        throw new Error("Category id isn't valid");
      }

      if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("User id isn't valid");
      }

      const userData = await User.findById(userId);
      if (!userData) {
        throw new Error("User not found");
      } else {
        const categoryData = await Category.findById(inputCategory);
        if (!categoryData) {
          throw new Error("Category no found");
        } else {
          const result = await course.save();
          createdCourse = transformCourse(result);

          userData.createdCourse.push(course);
          categoryData.courseList.push(course);

          await userData.save();
          await categoryData.save();

          return createdCourse;
        }
      }
    } catch (error) {
      throw error;
    }
  }
};
