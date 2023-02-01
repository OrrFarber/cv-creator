const mongoose = require("mongoose");
const FormSchema = new mongoose.Schema({
  email: {
    type: String,
  },
  name: {
    type: String,
    // required: true,
  },
  phone: {
    type: Number,
  },
  profession: {
    type: String,
    // required: true,
  },
  linkedin: {
    type: String,
  },
  languages: {
    type: String,
  },
  skills: {
    type: Array,
  },
  about: {
    type: String,
  },
  education: {
    type: String,
  },
  work: {
    type: String,
  },
  volunteer: {
    type: String,
  },
});
module.exports = mongoose.model("CV", FormSchema);
