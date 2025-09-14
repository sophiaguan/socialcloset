const mongoose = require("mongoose");

// Solution 1: Use String type for Google IDs
const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true },
  users: [{ 
    type: String, // Changed from ObjectId to String
    ref: 'user' // Still reference the User model
  }],
});

module.exports = mongoose.model("group", GroupSchema);