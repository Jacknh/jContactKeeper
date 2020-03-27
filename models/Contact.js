const mongoose = require("mongoose");

const ContactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    match: [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, "invalid email"],
    required: [true, "Email is required"]
  },
  phone: {
    type: String
  },
  type: {
    type: String,
    default: "personal"
  },
  user: {
    type: mongoose.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = mongoose.model("Contact", ContactSchema);
