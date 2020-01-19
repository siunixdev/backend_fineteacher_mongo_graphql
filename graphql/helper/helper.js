const Category = require("../../models/category");
const User = require("../../models/user");
const Course = require("../../models/course");

let courses = async courseIds => {
  try {
    const courses = await Course.find({ _id: { $in: courseIds } });
    return courses.map(course => {
      return transformCourse(course);
    });
  } catch (err) {
    throw err;
  }
};

let singleCourse = async courseId => {
  try {
    const course = await Course.findById(courseId);
    return transformCourse(course);
  } catch (error) {
    throw error;
  }
};

let user = async userId => {
  try {
    const user = await User.findById(userId);
    return transformUser(user);
  } catch (error) {
    throw error;
  }
};

let category = async categoryId => {
  try {
    const category = await Category.findById(categoryId);
    return transformCategory(category);
  } catch (error) {
    throw error;
  }
};

const transformCourse = course => {
  return {
    ...course._doc,
    createdBy: user.bind(this, course.createdBy),
    // courseList: category.bind(this, course.category),
    category: category.bind(this, course._doc.category)
  };
};

const transformJoinCourse = joinCourse => {
  return {
    ...joinCourse._doc,
    user: user.bind(this, joinCourse._doc.user),
    course: singleCourse.bind(this, joinCourse._doc.course),
    createdAt: new Date(joinCourse._doc.createdAt).toISOString(),
    updatedAt: new Date(joinCourse._doc.updatedAt).toISOString()
  };
};

const transformCategory = category => {
  return {
    ...category._doc,
    courseList: courses.bind(this, category._doc.courseList)
  };
};

const transformUser = user => {
  return {
    ...user._doc,
    createdCourse: courses.bind(this, user._doc.createdCourse)
  };
};

exports.transformCategory = transformCategory;
exports.transformCourse = transformCourse;
exports.transformJoinCourse = transformJoinCourse;
exports.transformUser = transformUser;
exports.user = user;
exports.category = category;
