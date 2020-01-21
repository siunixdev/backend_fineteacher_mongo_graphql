const { buildSchema } = require("graphql");

module.exports = buildSchema(`

type JoinCourse {
  _id: ID!
  course: Course!,
  user: User!,
  createdAt: String!,
  updatedAt: String!
}

type Category {
  _id: ID!
  title: String!
  courseList: [Course!]
}

type User {
  _id:ID!
  fullname: String!
  email: String!
  password: String!
  createdCourse: [Course!]
}

type AuthData {
  message: String!
  userId: ID!
  token: String!
  tokenExpiration: Int!
}

type Course {
  _id:ID!
  title: String!
  description: String!
  courseType: String!
  price: Float!
  totalMaxStudent: Int!
  address: String!
  createdBy : User!
  category : Category!
}

input CategoryInput {
  title: String!
}

input UserInput {
  fullname: String!
  email: String!
  password: String!
}

input CourseInput {
  title: String!
  description: String!
  courseType: String!
  price: Float!
  totalMaxStudent: Int!
  address: String!
  categoryId: String!
}

type RootQuery {
  users: [User!]!
  categories: [Category!]!
  courses: [Course!]!
  joinCourseList: [JoinCourse!]!
  sign(email: String!, password:String!): AuthData!
}

type RootMutation {
  createCategory(categoryInput : CategoryInput): Category
  signUp(userInput : UserInput): AuthData!
  createCourse(courseInput : CourseInput): Course
  joinCourse(courseId: ID!): JoinCourse!
  cancelJoinCourse(joinCourseId: ID!): Course!
}

schema {
  query : RootQuery
  mutation : RootMutation
}
`);
