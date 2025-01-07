const mongoose = require("mongoose");

const emailVerificationSchema = new mongoose.Schema({
  email: { type: String, required: true },
  verificationCode: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const EmailVerification = mongoose.model(
  "EmailVerification",
  emailVerificationSchema
);
module.exports = EmailVerification;
