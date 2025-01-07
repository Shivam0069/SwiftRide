const express = require("express");
const router = express.Router();
const emailVerificationController = require("../controllers/emailVerification.controller");

router.post("/verify-email", emailVerificationController.verifyEmail);

router.post(
  "/send-verification-email",
  emailVerificationController.sendVerificationEmail
);
module.exports = router;
