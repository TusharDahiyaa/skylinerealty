const mongoose = require("mongoose");
const validator = require("validator");

// Define a mongoose model for storing user information
const User = mongoose.model("user", {
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate(value) {
      if (!validator.isEmail(value)) {
        throw new Error("Email is invalid");
      }
    },
  },
  phoneNumber: {
    type: String,
    required: true,
    validate(value) {
      if (value < 10) {
        throw new Error("Phone Number must be of 10 digits");
      }
    },
  },
  userMessage: {
    type: String,
    default: "",
    required: true,
  },
  sendStatus: {
    type: String,
    default: "UN_SENT",
  },
});

module.exports = User;
