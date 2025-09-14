const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  closetSize: Number,
  heads: [String],
  tops: [String],
  bottoms: [String],
  shoes: [String],
  outfits: [(String, String, String, String)],
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
