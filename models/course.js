const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  courseType: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  totalMaxStudent: {
    type: Number,
    required: true
  },
  address: {
    type: String,
    required: true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "Category"
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref: "User"
  }
});

module.exports = mongoose.model("Course", courseSchema);
