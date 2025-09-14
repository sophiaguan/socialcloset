const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  googleid: String,
  closetSize: Number,
  heads: [String],
  tops: [String],
  bottoms: [String],
  outfits: Array,
});

// compile model from schema
module.exports = mongoose.model("user", UserSchema);
