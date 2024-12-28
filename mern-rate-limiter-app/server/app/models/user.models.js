const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  mobile_number: {
    required: true,
    unique: true,
    type: String,
  },
  full_name: {
    required: true,
    type: String,
  },
  password: {
    required: false,
    type: String,
  },
  token:{
    required: true,
    type: String,
  }
});

module.exports = mongoose.model("User", userSchema);
