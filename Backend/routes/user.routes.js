// Import the express module
const express = require("express");
// Create a new router object
const router = express.Router();
// Import the body function from express-validator
const { body } = require("express-validator");
// Import the user controller
const userController = require("../controllers/user.controller");

// Define a POST route for user registration
router.post(
  "/register",
  [
    // Validate that the email field contains a valid email address
    body("email").isEmail().withMessage("Invalid Email"),
    // Validate that the first name is at least 3 characters long
    body("fullname.firstname")
      .isLength({ min: 3 })
      .withMessage("First name must be at least 3 characters long"),
    // Validate that the password is at least 6 characters long
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  // Call the registerUser method from the user controller
  userController.registerUser
);

// Define a POST route for user login
router.post(
  "/login",
  [
    // Validate that the email field contains a valid email address
    body("email").isEmail().withMessage("Invalid Email"),
    // Validate that the password is at least 6 characters long
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  // Call the loginUser method from the user controller
  userController.loginUser
);

// Export the router object
module.exports = router;
