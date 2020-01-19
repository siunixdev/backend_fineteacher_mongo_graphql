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
  email: String!
  password: String!
  createdCourse: [Course!]
}

type AuthData {
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
  signUp(userInput : UserInput): User
  createCourse(courseInput : CourseInput): Course
  joinCourse(courseId: ID!): JoinCourse!
  cancelJoinCourse(joinCourseId: ID!): Course!
}

schema {
  query : RootQuery
  mutation : RootMutation
}
`);
