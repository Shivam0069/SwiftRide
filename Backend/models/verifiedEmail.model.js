const mongoose = require("mongoose");

const verifiedEmailSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});
const VerifiedEmail = mongoose.model("VerifiedEmail", verifiedEmailSchema);
module.exports = VerifiedEmail;
