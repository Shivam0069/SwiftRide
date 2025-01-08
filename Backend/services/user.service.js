// Import the user model for interacting with the "users" collection in the database
const userModel = require("../models/user.model");

// Import the bcrypt library for hashing passwords
const bcrypt = require("bcrypt");

// Define and export the createUser function as a module
module.exports.createUser = async ({
  firstname, // First name of the user
  lastname, // Last name of the user
  email, // Email of the user
  password, // Password of the user
}) => {
  // Validation: Ensure all required fields are provided
  if (!firstname || !email || !password) {
    throw new Error("Please provide all the required fields");
  }

  // Check if a user with the provided email already exists in the database
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email is already registered");
  }

  // Hash the provided password with a salt factor of 10

  // Create a new user instance with the provided data and the hashed password
  const user = new userModel({
    fullname: {
      firstname, // Set the first name in the `fullname` field
      lastname, // Set the last name in the `fullname` field
    },
    email, // Set the email field
    password, // Store the hashed password
  });

  // Save the new user to the database and return the saved document
  return await user.save();
};
