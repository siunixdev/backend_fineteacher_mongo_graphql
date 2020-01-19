const authResolver = require("./auth");
const categoriesResolver = require("./categories");
const usersResolver = require("./users");
const coursesResolver = require("./courses");
const joinCoursesResolver = require("./joinCourses");

const rootResolver = {
  ...authResolver,
  ...categoriesResolver,
  ...usersResolver,
  ...coursesResolver,
  ...joinCoursesResolver
};

module.exports = rootResolver;
