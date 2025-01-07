// Importing the user model
const userModel = require("../models/user.model");
// Importing the user service
const userService = require("../services/user.service");
// Importing the validation result function from express-validator
const { validationResult } = require("express-validator");

const blacklistTokenModel = require("../models/blacklistToken.model");

const verifiedEmailModel = require("../models/verifiedEmail.model");
// Register a new user
module.exports.registerUser = async (req, res, next) => {
  try {
    // Validate the request body for errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // If there are validation errors, return a 400 status with the errors
      return res.status(400).json({ errors: errors.array() });
    }

    // Destructure fullname, email, and password from the request body
    const { fullname, email, password } = req.body;
    // Hash the user's password

    // Check if a user with the given email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      // If the email already exists, return a 400 status with an error message
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingVerifiedEmail = await verifiedEmailModel.findOne({
      email,
      verified: true,
    });
    if (!existingVerifiedEmail) {
      return res.status(400).json({ message: "Email not verified" });
    }
    const hashedPassword = await userModel.hashPassword(password);

    // Create a new user with the provided details
    const user = await userService.createUser({
      firstname: fullname.firstname,
      lastname: fullname.lastname,
      email,
      password: hashedPassword,
    });

    // Generate an authentication token for the new user
    const token = user.generateAuthToken();

    user.password = undefined;
    // Return a 201 status with the token and user details
    res.status(201).json({ token, user });
  } catch (error) {
    // Log any errors to the console
    console.error(error);
    // Return a 500 status with an error message
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Login an existing user
module.exports.loginUser = async (req, res, next) => {
  // Validate the request body for errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // If there are validation errors, return a 400 status with the errors
    return res.status(400).json({ errors: errors.array() });
  }

  // Destructure email and password from the request body
  const { email, password } = req.body;

  try {
    // Find the user by email and include the password field
    const user = await userModel.findOne({ email }).select("+password");
    if (!user) {
      // If the user is not found, return a 401 status with an error message
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Compare the provided password with the stored hashed password
    const isValidPassword = await user.comparePassword(password);
    if (!isValidPassword) {
      // If the password is invalid, return a 401 status with an error message
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Generate an authentication token for the user
    const token = user.generateAuthToken();
    // Return a 200 status with the token and user details

    res.cookie("token", token);
    user.password = undefined;
    res.status(200).json({ token, user });
  } catch (error) {
    // Log any errors to the console
    console.error(error);
    // Return a 500 status with an error message
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get the user profile
module.exports.getUserProfile = async (req, res, next) => {
  // Return a 200 status with the user details from the request
  res.status(200).json(req.user);
};

// Logout the user
module.exports.logoutUser = async (req, res, next) => {
  // Get the token from cookies or authorization header
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  // Add the token to the blacklist
  await blacklistTokenModel.create({ token });
  // Clear the token cookie
  res.clearCookie("token");
  // Return a 200 status with a success message
  res.status(200).json({ message: "Logged out successfully" });
};
