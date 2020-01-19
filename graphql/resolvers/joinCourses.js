const Course = require("../../models/course");
const JoinCourse = require("../../models/joinCourse");

const { transformJoinCourse, user } = require("../helper/helper");

module.exports = {
  joinCourseList: async req => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const joinCourses = await JoinCourse.find();
      return joinCourses.map(joinCourse => {
        return transformJoinCourse(joinCourse);
      });
    } catch (error) {
      throw error;
    }
  },
  joinCourse: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    const fetchedCourse = await Course.findOne({ _id: args.courseId });
    const joinCourse = new JoinCourse({
      user: req.userId,
      course: fetchedCourse
    });

    const result = await joinCourse.save();
    return transformJoinCourse(result);
  },
  cancelJoinCourse: async (args, req) => {
    if (!req.isAuth) {
      throw new Error("Unauthenticated!");
    }
    try {
      const joinCourse = await JoinCourse.findById(args.joinCourseId).populate(
        "course"
      );
      if (!joinCourse) {
        throw new Error("Data not found!");
      }

      const course = {
        ...joinCourse.course._doc,
        createdBy: user.bind(this, joinCourse.course._doc.createdBy)
      };
      await JoinCourse.deleteOne({ _id: args.joinCourseId });
      return course;
    } catch (error) {
      throw error;
    }
  }
};
