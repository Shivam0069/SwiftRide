const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  if (!firstname || !email || !password) {
    throw new Error("Please provide all the required fields");
  }

  // Check for existing user
  const existingUser = await userModel.findOne({ email });
  if (existingUser) {
    throw new Error("Email is already registered");
  }

  // Create and save the user
  const user = new userModel({
    fullname: {
      firstname,
      lastname,
    },
    email,
    password,
  });

  return await user.save();
};
