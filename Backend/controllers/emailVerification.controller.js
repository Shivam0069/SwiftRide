const EmailVerification = require("../models/emailVerification.model");
const emailService = require("../services/email.service");
const bcrypt = require("bcrypt");
const VerifiedEmail = require("../models/verifiedEmail.model");
module.exports.verifyEmail = async (req, res, next) => {
  try {
    const { email, verificationCode } = req.body;

    // Validate input data
    if (!email || !verificationCode) {
      return res.status(400).json({
        message: "Email and verification code are required",
      });
    }

    // Find the user in the EmailVerification collection
    const user = await EmailVerification.findOne({ email });
    if (!user) {
      return res.status(404).json({
        message: "Invalid or expired verification token",
      });
    }

    // Check if the verification code has expired (10-minute window)
    const isExpired = user.createdAt.getTime() + 10 * 60 * 1000 < Date.now();
    if (isExpired) {
      await EmailVerification.deleteOne({ email }); // Clean up expired tokens
      return res.status(400).json({
        message: "Verification code expired",
      });
    }

    // Compare verification code
    const isMatch = await bcrypt.compare(
      verificationCode,
      user.verificationCode
    );
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid verification code",
      });
    }

    await VerifiedEmail.create({ email, verified: true });

    // Delete the verification token after successful verification
    await EmailVerification.deleteOne({ email });

    // Return success response
    return res.status(200).json({
      message: "Email verified successfully",
    });
  } catch (error) {
    console.error("Email verification error:", error);

    // Return generic error response
    res.status(500).json({
      message: "Failed to verify email. Please try again later.",
    });
  }
};

module.exports.sendVerificationEmail = async (req, res, next) => {
  const { email } = req.body;
  const verificationCode = Math.floor(
    100000 + Math.random() * 900000
  ).toString();
  const otp = await bcrypt.hash(verificationCode, 10);
  const emailVerification = new EmailVerification({
    email,
    verificationCode: otp,
  });
  try {
    await emailVerification.save();
    const message = emailService.generateOtpEmail({ otp: verificationCode });
    await emailService.sendMail({
      to: email,
      subject: "Email Verification - Swift Ride",
      message,
    });
    res.status(200).json({
      message: "Verification email sent successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Failed to send verification email",
    });
  }
};
