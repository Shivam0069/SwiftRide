const nodemailer = require("nodemailer");
module.exports.sendMail = async ({ to, subject, message, attachments }) => {
  try {
    const mailOptions = {
      from: process.env.EMAIL,
      to: to,
      subject: subject,
      html: message, // Use 'html' for HTML content
      attachments: attachments,
    };

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      service: "gmail",
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const res = await transporter.sendMail(mailOptions);
    return res;
  } catch (error) {
    console.log(error, "email send error");

    return false;
  }
};
module.exports.generateOtpEmail = ({ otp }) => {
  return `
      <div style="font-family: Arial, sans-serif; line-height: 1.5; color: #333;">
        <h2 style="color: #2BDF68;">Email Verification - Swift Ride</h2>
        <p>Dear User,</p>
        <p>Welcome to Swift Ride! To get started with your journey, please verify your email address using the following One-Time Password (OTP):</p>
        <h3 style="background-color: #f4f4f4; padding: 10px; text-align: center; border-radius: 5px; color: #2BDF68;">
          ${otp}
        </h3>
        <p>This OTP is valid for the next 10 minutes. If you did not request this email, please ignore it.</p>
        <p>Need help? Feel free to reach out to our support team at <a href="mailto:support@swiftride.com" style="color: #2BDF68;">support@swiftride.com</a>.</p>
        <p>Thank you for choosing Swift Ride!</p>
        <p>Best regards,</p>
        <p>The Swift Ride Team</p>
      </div>
    `;
};
