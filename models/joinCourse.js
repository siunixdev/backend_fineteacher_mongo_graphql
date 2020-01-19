const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const joinSchema = new Schema(
  {
    course: {
      type: Schema.Types.ObjectId,
      ref: "Course"
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("JoinCourse", joinSchema);
