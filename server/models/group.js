const mongoose = require("mongoose");

const GroupSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  code: { type: String, required: true, unique: true },
  users: [String],
  heads: [String],
  tops: [String],
  bottoms: [String],
  shoes: [String],
  outfits: [(String, String, String, String, String)],
});

module.exports = mongoose.model("group", GroupSchema);
