const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: String,
  code: String,
  users: Array,
});

// compile model from schema
module.exports = mongoose.model("group", GroupSchema);
