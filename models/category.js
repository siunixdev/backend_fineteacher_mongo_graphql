const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const categorySchema = new Schema({
  title: {
    type: String,
    required: true
  },
  courseList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Course"
    }
  ]
});

module.exports = mongoose.model("Category", categorySchema);
